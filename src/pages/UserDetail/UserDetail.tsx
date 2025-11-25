import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { usersService } from '../../services/users';
import { eventsService } from '../../services/events';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'events'>('details');

  const { 
    data: userData, 
    isLoading: userLoading, 
    error: userError,
    refetch: refetchUser 
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => usersService.getUserWithEvents(id!),
    enabled: !!id,
  });

  const { 
    data: events, 
    isLoading: eventsLoading, 
    refetch: refetchEvents 
  } = useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsService.getUserEvents(id!),
    enabled: !!id && activeTab === 'events',
  });

  const syncEventsMutation = useMutation({
    mutationFn: () => eventsService.syncUserEvents(id!),
    onSuccess: () => {
      toast.success('Eventos sincronizados com sucesso!');
      refetchEvents();
      refetchUser();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao sincronizar eventos');
    },
  });

  if (userLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Carregando usuário...</span>
        </div>
      </Layout>
    );
  }

  if (userError || !userData) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <span className="text-lg mr-2">❌</span>
            <div>
              <p className="font-medium">Erro ao carregar usuário</p>
              <p className="text-sm mt-1">
                {userError?.message || 'Usuário não encontrado'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <Button 
              onClick={() => navigate('/users')} 
              variant="outline"
              size="sm"
            >
              ← Voltar para lista
            </Button>
            <Button 
              onClick={() => refetchUser()} 
              variant="primary"
              size="sm"
            >
              🔄 Tentar novamente
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const { user } = userData;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <Link 
              to="/users" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              ← Voltar para lista de usuários
            </Link>
            <div className="flex items-center mt-2">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-xl">
                  {user.givenName?.[0]}{user.surname?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.displayName}</h1>
                <p className="text-gray-600">{user.mail}</p>
                {user.jobTitle && (
                  <p className="text-sm text-gray-500 mt-1">{user.jobTitle}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={() => syncEventsMutation.mutate()} 
              loading={syncEventsMutation.isPending}
              variant="primary"
            >
              🔄 Sincronizar Eventos
            </Button>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Informações
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Eventos ({events?.length || user.eventCount || 0})
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nome Completo</dt>
                    <dd className="text-sm text-gray-900 mt-1">{user.displayName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Primeiro Nome</dt>
                    <dd className="text-sm text-gray-900 mt-1">{user.givenName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Sobrenome</dt>
                    <dd className="text-sm text-gray-900 mt-1">{user.surname}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900 mt-1">{user.mail}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Profissionais</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cargo</dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {user.jobTitle || <span className="text-gray-400">Não informado</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Departamento</dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {user.department || <span className="text-gray-400">Não informado</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Localização</dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {user.officeLocation || <span className="text-gray-400">Não informada</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Última Sincronização</dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {user.lastSyncedAt 
                        ? new Date(user.lastSyncedAt).toLocaleString('pt-BR')
                        : <span className="text-gray-400">Nunca sincronizado</span>
                      }
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total de Eventos</dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.eventCount || 0} eventos
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Eventos da Agenda</h3>
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => refetchEvents()} 
                    variant="outline" 
                    size="sm"
                    loading={eventsLoading}
                  >
                    🔄 Atualizar
                  </Button>
                </div>
              </div>

              {eventsLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Carregando eventos...</span>
                </div>
              ) : events && events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">{event.subject}</h4>
                        <div className="flex space-x-2">
                          {event.isAllDay && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Dia Inteiro
                            </span>
                          )}
                        </div>
                      </div>

                      {event.bodyPreview && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {event.bodyPreview}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-500">Início:</span>
                          <div className="text-gray-900">
                            {new Date(event.start).toLocaleString('pt-BR')}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Término:</span>
                          <div className="text-gray-900">
                            {new Date(event.end).toLocaleString('pt-BR')}
                          </div>
                        </div>
                      </div>

                      {event.location && (
                        <div className="mb-3">
                          <span className="font-medium text-gray-500 text-sm">📍 Local:</span>
                          <span className="text-gray-900 text-sm ml-2">{event.location}</span>
                        </div>
                      )}

                      {event.organizerName && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-500 text-sm">👤 Organizador:</span>
                          <span className="text-gray-900 text-sm ml-2">{event.organizerName}</span>
                          {event.organizerEmail && (
                            <span className="text-gray-500 text-sm ml-2">({event.organizerEmail})</span>
                          )}
                        </div>
                      )}

                      <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
                        Atualizado em: {new Date(event.lastUpdatedAt).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum evento encontrado
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Este usuário não possui eventos ou eles ainda não foram sincronizados
                  </p>
                  <Button 
                    onClick={() => syncEventsMutation.mutate()} 
                    loading={syncEventsMutation.isPending}
                    variant="primary"
                  >
                    🔄 Sincronizar Eventos
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};