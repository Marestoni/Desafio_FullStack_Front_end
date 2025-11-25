export const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎓 EduGraph Scheduler
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sistema de agendamento para instituições de ensino
        </p>
        <div className="space-y-4">
          <a 
            href="/login" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer Login
          </a>
          <p className="text-sm text-gray-500">
            Ou acesse diretamente <a href="/login" className="text-blue-600 hover:underline">/login</a>
          </p>
        </div>
      </div>
    </div>
  );
};