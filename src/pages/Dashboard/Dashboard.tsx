import { Layout } from '../../components/layout/Layout';
import { StatCard } from '../../components/ui/StatCard';
import { useAuthStore } from '../../store/auth.store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../../services/users';
import { syncService } from '../../services/sync';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  const { data: users, isLoading: usersLoading, refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAllUsers,
  });

  const syncMutation = useMutation({
    mutationFn: syncService.syncUsers,
    onSuccess: (data) => {
      toast.success(data.message || 'Sincronização concluída com sucesso!');
      setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
      refetchUsers();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao sincronizar';
      toast.error(`Falha na sincronização: ${errorMessage}`);
    },
  });

  const stats = {
    totalUsers: users?.length || 0,
    totalEvents: users?.reduce((sum, user) => sum + (user.eventCount || 0), 0) || 0,
    usersWithSync: users?.filter(user => user.lastSyncedAt)?.length || 0,
    syncPercentage: users?.length ? Math.round((users.filter(user => user.lastSyncedAt).length / users.length) * 100) : 0,
  };

  if (usersLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Carregando dashboard...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo, {user?.displayName}!
        </h1>
        <p className="text-gray-600">
          Aqui está um resumo das atividades do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total de Usuários"
          value={stats.totalUsers.toLocaleString()}
          icon="👥"
          description="Usuários no sistema"
        />
        
        <StatCard
          title="Total de Eventos"
          value={stats.totalEvents.toLocaleString()}
          icon="📅"
          description="Eventos agendados"
        />
        
        <StatCard
          title="Usuários Sincronizados"
          value={stats.usersWithSync.toLocaleString()}
          icon="✅"
          description="Com dados atualizados"
        />
        
        <StatCard
          title="Taxa de Sincronização"
          value={`${stats.syncPercentage}%`}
          icon="🔄"
          description="Eficiência do sistema"
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            className={`p-4 rounded-lg text-left transition-colors w-full ${
              syncMutation.isPending 
                ? 'bg-gray-100 cursor-not-allowed' 
                : 'bg-blue-50 hover:bg-blue-100'
            }`}
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
          >
            <div className="text-blue-600 text-lg mb-2">
              {syncMutation.isPending ? '⏳' : '🔄'}
            </div>
            <h3 className="font-medium text-gray-900">
              {syncMutation.isPending ? 'Sincronizando...' : 'Sincronizar Agora'}
            </h3>
            <p className="text-sm text-gray-600">
              {syncMutation.isPending ? 'Atualizando dados...' : 'Atualizar dados do Microsoft Graph'}
            </p>
            {lastSyncTime && (
              <p className="text-xs text-blue-500 mt-1">
                Última: {lastSyncTime}
              </p>
            )}
          </button>
          
          <Link 
            to="/users" 
            className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-left transition-colors block"
          >
            <div className="text-green-600 text-lg mb-2">👥</div>
            <h3 className="font-medium text-gray-900">Ver Usuários</h3>
            <p className="text-sm text-gray-600">Listar todos os usuários</p>
          </Link>
          
        
        </div>
      </div>

      {syncMutation.isPending && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
            <div>
              <p className="text-blue-800 font-medium">Sincronização em andamento</p>
              <p className="text-blue-600 text-sm">Buscando dados do Microsoft Graph...</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Atividade Recente
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-3">
                Sincronizado
              </span>
              <span className="text-sm text-gray-600">
                {stats.totalUsers.toLocaleString()} usuários carregados
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {users && users.length > 0 && users[0].lastSyncedAt 
                ? `Última sincronização: ${new Date(users[0].lastSyncedAt).toLocaleDateString('pt-BR')}`
                : 'Nunca sincronizado'
              }
            </span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-3">
                Eventos
              </span>
              <span className="text-sm text-gray-600">
                {stats.totalEvents.toLocaleString()} eventos no sistema
              </span>
            </div>
            <span className="text-xs text-gray-500">Total acumulado</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <span className={`text-xs px-2 py-1 rounded mr-3 ${
                stats.syncPercentage >= 80 
                  ? 'bg-green-100 text-green-800' 
                  : stats.syncPercentage >= 50 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                Status
              </span>
              <span className="text-sm text-gray-600">
                {stats.syncPercentage >= 80 
                  ? 'Sistema operacional' 
                  : stats.syncPercentage >= 50 
                  ? 'Sistema precisa de atenção'
                  : 'Sistema precisa de sincronização urgente'
                }
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {stats.syncPercentage}% sincronizado
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Status do Sistema
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">API Microsoft Graph</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Conectado
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Serviço de Sincronização</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              syncMutation.isPending 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {syncMutation.isPending ? 'Em execução' : 'Pronto'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Banco de Dados</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Online
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};