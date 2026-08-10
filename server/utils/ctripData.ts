import type {
  Autocarro,
  Cidade,
  Empresa,
  Horario,
  LogAuditoria,
  Mensagem,
  MembroEquipa,
  Motorista,
  Notificacao,
  Passageiro,
  Presenca,
  Reembolso,
  Rota,
  Tarefa
} from '~/types'

/**
 * Fonte única de dados fictícios do C-Trip, partilhada por todos os endpoints
 * em `server/api/**`. O Gestor de Frota e o Publicador de Rotas trabalham
 * ambos na mesma empresa fictícia (Kwanza Expresso), pelo que os autocarros e
 * motoristas registados aqui são os mesmos que aparecem nos horários
 * publicados.
 */

export const EMPRESA_ACTIVA = 'Kwanza Expresso'

export const cidades: Cidade[] = [
  { id: 1, nome: 'Luanda', provincia: 'Luanda', pais: 'Angola', activa: true },
  { id: 2, nome: 'Benguela', provincia: 'Benguela', pais: 'Angola', activa: true },
  { id: 3, nome: 'Huambo', provincia: 'Huambo', pais: 'Angola', activa: true },
  { id: 4, nome: 'Lubango', provincia: 'Huíla', pais: 'Angola', activa: true },
  { id: 5, nome: 'Cabinda', provincia: 'Cabinda', pais: 'Angola', activa: true },
  { id: 6, nome: 'Malanje', provincia: 'Malanje', pais: 'Angola', activa: true },
  { id: 7, nome: 'Sumbe', provincia: 'Cuanza Sul', pais: 'Angola', activa: true },
  { id: 8, nome: 'Namibe', provincia: 'Namibe', pais: 'Angola', activa: true },
  { id: 9, nome: 'Uíge', provincia: 'Uíge', pais: 'Angola', activa: true },
  { id: 10, nome: 'Kuito', provincia: 'Bié', pais: 'Angola', activa: true },
  { id: 11, nome: 'Soyo', provincia: 'Zaire', pais: 'Angola', activa: true },
  { id: 12, nome: 'Ndalatando', provincia: 'Cuanza Norte', pais: 'Angola', activa: true },
  { id: 13, nome: 'Menongue', provincia: 'Cuando Cubango', pais: 'Angola', activa: false },
  { id: 14, nome: 'Ondjiva', provincia: 'Cunene', pais: 'Angola', activa: false }
]

export const empresas: Empresa[] = [
  {
    id: 1,
    nome: 'Kwanza Expresso',
    nif: '5417234891',
    cidadeSede: 'Luanda',
    responsavelNome: 'Domingas Sachipengo',
    responsavelEmail: 'domingas.sachipengo@kwanzaexpresso.co.ao',
    estado: 'verificada',
    dataRegisto: '2025-11-03',
    rotasActivas: 6,
    vendas30d: 8420000,
    reclamacoes: 1
  },
  {
    id: 2,
    nome: 'Estrela do Huambo Viagens',
    nif: '5417559012',
    cidadeSede: 'Huambo',
    responsavelNome: 'Casimiro Wanga',
    responsavelEmail: 'casimiro.wanga@estreladohuambo.co.ao',
    estado: 'verificada',
    dataRegisto: '2025-09-18',
    rotasActivas: 4,
    vendas30d: 5210000,
    reclamacoes: 3
  },
  {
    id: 3,
    nome: 'Trans-Benguela Turismo',
    nif: '5417880234',
    cidadeSede: 'Benguela',
    responsavelNome: 'Alcides Mbumba',
    responsavelEmail: 'alcides.mbumba@transbenguela.co.ao',
    estado: 'pendente',
    dataRegisto: '2026-08-02',
    rotasActivas: 0,
    vendas30d: 0,
    reclamacoes: 0
  },
  {
    id: 4,
    nome: 'Novo Horizonte Viagens',
    nif: '5417113456',
    cidadeSede: 'Lubango',
    responsavelNome: 'Isabel Capemba',
    responsavelEmail: 'isabel.capemba@novohorizonte.co.ao',
    estado: 'verificada',
    dataRegisto: '2025-06-27',
    rotasActivas: 3,
    vendas30d: 3180000,
    reclamacoes: 0
  },
  {
    id: 5,
    nome: 'Costa Atlântica Transportes',
    nif: '5417667788',
    cidadeSede: 'Namibe',
    responsavelNome: 'Joaquim Domingos',
    responsavelEmail: 'joaquim.domingos@costaatlantica.co.ao',
    estado: 'recusada',
    dataRegisto: '2026-07-14',
    rotasActivas: 0,
    vendas30d: 0,
    reclamacoes: 0
  },
  {
    id: 6,
    nome: 'Kwanza Norte Rápido',
    nif: '5417990021',
    cidadeSede: 'Malanje',
    responsavelNome: 'Rosa Bumba',
    responsavelEmail: 'rosa.bumba@kwanzanorterapido.co.ao',
    estado: 'pendente',
    dataRegisto: '2026-08-05',
    rotasActivas: 0,
    vendas30d: 0,
    reclamacoes: 0
  }
]

export const autocarros: Autocarro[] = [
  { id: 1, matricula: 'LD-12-34-EA', modelo: 'Mercedes-Benz O500RS', filas: 12, lugaresPorFila: 4, capacidade: 48, estado: 'disponivel' },
  { id: 2, matricula: 'LD-56-78-EA', modelo: 'Marcopolo Paradiso 1200', filas: 11, lugaresPorFila: 4, capacidade: 44, estado: 'disponivel' },
  { id: 3, matricula: 'LD-90-12-EA', modelo: 'Yutong ZK6122H', filas: 13, lugaresPorFila: 4, capacidade: 52, estado: 'manutencao' },
  { id: 4, matricula: 'BG-34-56-EA', modelo: 'Scania Irizar i6', filas: 12, lugaresPorFila: 4, capacidade: 48, estado: 'disponivel' },
  { id: 5, matricula: 'LD-78-90-EA', modelo: 'Volvo 9800', filas: 10, lugaresPorFila: 4, capacidade: 40, estado: 'disponivel' },
  { id: 6, matricula: 'LD-23-45-EA', modelo: 'Mercedes-Benz Travego', filas: 12, lugaresPorFila: 4, capacidade: 48, estado: 'manutencao' }
]

export const motoristas: Motorista[] = [
  { id: 1, name: 'Zeferino Muteka', email: 'zeferino.muteka@kwanzaexpresso.co.ao', telefone: '+244 923 445 112', carta: 'AO-DL-88234', disponibilidade: 'disponivel', viagensMes: 15, avatar: { src: 'https://i.pravatar.cc/128?u=motorista1' } },
  { id: 2, name: 'Adriano Chissano', email: 'adriano.chissano@kwanzaexpresso.co.ao', telefone: '+244 912 330 887', carta: 'AO-DL-77120', disponibilidade: 'em_viagem', viagensMes: 21, avatar: { src: 'https://i.pravatar.cc/128?u=motorista2' } },
  { id: 3, name: 'Bento Katumba', email: 'bento.katumba@kwanzaexpresso.co.ao', telefone: '+244 934 221 556', carta: 'AO-DL-65043', disponibilidade: 'folga', viagensMes: 3, avatar: { src: 'https://i.pravatar.cc/128?u=motorista3' } },
  { id: 4, name: 'Elisa Ngonga', email: 'elisa.ngonga@kwanzaexpresso.co.ao', telefone: '+244 927 664 219', carta: 'AO-DL-91287', disponibilidade: 'disponivel', viagensMes: 18, avatar: { src: 'https://i.pravatar.cc/128?u=motorista4' } },
  { id: 5, name: 'Feliciano Sabino', email: 'feliciano.sabino@kwanzaexpresso.co.ao', telefone: '+244 941 558 903', carta: 'AO-DL-54932', disponibilidade: 'disponivel', viagensMes: 12, avatar: { src: 'https://i.pravatar.cc/128?u=motorista5' } },
  { id: 6, name: 'Ana Paula Domingos', email: 'anapaula.domingos@kwanzaexpresso.co.ao', telefone: '+244 915 772 340', carta: 'AO-DL-40218', disponibilidade: 'em_viagem', viagensMes: 24, avatar: { src: 'https://i.pravatar.cc/128?u=motorista6' } }
]

export const equipa: MembroEquipa[] = [
  { id: 1, name: 'Zeferino Muteka', email: 'zeferino.muteka@kwanzaexpresso.co.ao', papel: 'motorista', estado: 'activo', dataEntrada: '2024-02-14', avatar: { src: 'https://i.pravatar.cc/128?u=motorista1' } },
  { id: 2, name: 'Adriano Chissano', email: 'adriano.chissano@kwanzaexpresso.co.ao', papel: 'motorista', estado: 'activo', dataEntrada: '2024-05-02', avatar: { src: 'https://i.pravatar.cc/128?u=motorista2' } },
  { id: 3, name: 'Bento Katumba', email: 'bento.katumba@kwanzaexpresso.co.ao', papel: 'motorista', estado: 'activo', dataEntrada: '2023-11-20', avatar: { src: 'https://i.pravatar.cc/128?u=motorista3' } },
  { id: 4, name: 'Elisa Ngonga', email: 'elisa.ngonga@kwanzaexpresso.co.ao', papel: 'motorista', estado: 'activo', dataEntrada: '2025-01-09', avatar: { src: 'https://i.pravatar.cc/128?u=motorista4' } },
  { id: 5, name: 'Feliciano Sabino', email: 'feliciano.sabino@kwanzaexpresso.co.ao', papel: 'motorista', estado: 'activo', dataEntrada: '2025-03-30', avatar: { src: 'https://i.pravatar.cc/128?u=motorista5' } },
  { id: 6, name: 'Ana Paula Domingos', email: 'anapaula.domingos@kwanzaexpresso.co.ao', papel: 'motorista', estado: 'activo', dataEntrada: '2024-08-11', avatar: { src: 'https://i.pravatar.cc/128?u=motorista6' } },
  { id: 7, name: 'Rosa Kiluanje', email: 'rosa.kiluanje@kwanzaexpresso.co.ao', papel: 'operador', estado: 'activo', dataEntrada: '2024-04-17', avatar: { src: 'https://i.pravatar.cc/128?u=operador1' } },
  { id: 8, name: 'Miguel Wanga', email: 'miguel.wanga@kwanzaexpresso.co.ao', papel: 'operador', estado: 'activo', dataEntrada: '2024-09-25', avatar: { src: 'https://i.pravatar.cc/128?u=operador2' } },
  { id: 9, name: 'Sabina Necaca', email: 'sabina.necaca@kwanzaexpresso.co.ao', papel: 'operador', estado: 'inactivo', dataEntrada: '2023-06-08', avatar: { src: 'https://i.pravatar.cc/128?u=operador3' } },
  { id: 10, name: 'Edmilson Necaca', email: 'edmilson.necaca@kwanzaexpresso.co.ao', papel: 'gestor_rota', estado: 'activo', dataEntrada: '2023-09-01', avatar: { src: 'https://i.pravatar.cc/128?u=edmilson' } }
]

export const presencas: Presenca[] = [
  { id: 1, funcionarioId: 1, funcionarioNome: 'Zeferino Muteka', departamento: 'Condução', data: '2026-08-08', horaEntrada: '05:52', estado: 'presente' },
  { id: 2, funcionarioId: 2, funcionarioNome: 'Adriano Chissano', departamento: 'Condução', data: '2026-08-08', horaEntrada: '06:10', estado: 'atraso' },
  { id: 3, funcionarioId: 4, funcionarioNome: 'Elisa Ngonga', departamento: 'Condução', data: '2026-08-08', horaEntrada: '05:45', estado: 'presente' },
  { id: 4, funcionarioId: 7, funcionarioNome: 'Rosa Kiluanje', departamento: 'Bilhética', data: '2026-08-08', horaEntrada: '06:02', estado: 'presente' },
  { id: 5, funcionarioId: 8, funcionarioNome: 'Miguel Wanga', departamento: 'Bilhética', data: '2026-08-08', estado: 'ausente' },
  { id: 6, funcionarioId: 5, funcionarioNome: 'Feliciano Sabino', departamento: 'Condução', data: '2026-08-08', horaEntrada: '05:58', estado: 'presente' },
  { id: 7, funcionarioId: 3, funcionarioNome: 'Bento Katumba', departamento: 'Condução', data: '2026-08-07', horaEntrada: '05:50', estado: 'presente' },
  { id: 8, funcionarioId: 6, funcionarioNome: 'Ana Paula Domingos', departamento: 'Condução', data: '2026-08-07', horaEntrada: '06:20', estado: 'atraso' },
  { id: 9, funcionarioId: 1, funcionarioNome: 'Zeferino Muteka', departamento: 'Condução', data: '2026-08-07', horaEntrada: '05:55', estado: 'presente' },
  { id: 10, funcionarioId: 7, funcionarioNome: 'Rosa Kiluanje', departamento: 'Bilhética', data: '2026-08-07', horaEntrada: '06:00', estado: 'presente' }
]

export const tarefas: Tarefa[] = [
  { id: 1, titulo: 'Verificar pneus do autocarro LD-12-34-EA', descricao: 'Inspeccionar desgaste e pressão antes da partida das 07h00 para Benguela.', atribuidoA: 'Zeferino Muteka', prioridade: 'alta', estado: 'pendente', prazo: '2026-08-08T06:30:00' },
  { id: 2, titulo: 'Confirmar combustível — viagem Luanda-Huambo', descricao: 'Garantir depósito cheio antes da saída da tarde.', atribuidoA: 'Adriano Chissano', prioridade: 'media', estado: 'em_curso', prazo: '2026-08-08T12:00:00' },
  { id: 3, titulo: 'Entregar documentação na extensão Sul', descricao: 'Levar seguros actualizados dos autocarros LD-56-78-EA e LD-78-90-EA.', atribuidoA: 'Rosa Kiluanje', prioridade: 'baixa', estado: 'pendente', prazo: '2026-08-09T17:00:00' },
  { id: 4, titulo: 'Revisão de travões — LD-90-12-EA', descricao: 'Autocarro em manutenção preventiva na oficina central.', atribuidoA: 'Bento Katumba', prioridade: 'alta', estado: 'em_curso', prazo: '2026-08-10T09:00:00' },
  { id: 5, titulo: 'Confirmar escala de motoristas da próxima semana', descricao: 'Cruzar disponibilidade com os horários já publicados.', atribuidoA: 'Edmilson Necaca', prioridade: 'media', estado: 'pendente', prazo: '2026-08-11T18:00:00' },
  { id: 6, titulo: 'Higienização interior — LD-23-45-EA', descricao: 'Limpeza profunda antes de sair da manutenção.', atribuidoA: 'Miguel Wanga', prioridade: 'baixa', estado: 'concluida', prazo: '2026-08-06T15:00:00' },
  { id: 7, titulo: 'Actualizar seguro do BG-34-56-EA', descricao: 'Apólice vence a 20 de Agosto — renovar junto da seguradora.', atribuidoA: 'Domingas Sachipengo', prioridade: 'alta', estado: 'pendente', prazo: '2026-08-15T17:00:00' }
]

export const rotas: Rota[] = [
  {
    id: 1,
    origem: 'Luanda',
    destino: 'Benguela',
    paragens: [{ cidade: 'Sumbe', precoAcrescido: 7000 }],
    precoBase: 15000,
    distanciaKm: 620,
    activa: true
  },
  {
    id: 2,
    origem: 'Luanda',
    destino: 'Huambo',
    paragens: [{ cidade: 'Sumbe', precoAcrescido: 7000 }, { cidade: 'Waku Kungo', precoAcrescido: 11000 }],
    precoBase: 18500,
    distanciaKm: 720,
    activa: true
  },
  {
    id: 3,
    origem: 'Luanda',
    destino: 'Lubango',
    paragens: [{ cidade: 'Sumbe', precoAcrescido: 8000 }, { cidade: 'Benguela', precoAcrescido: 15000 }],
    precoBase: 25000,
    distanciaKm: 920,
    activa: true
  },
  {
    id: 4,
    origem: 'Luanda',
    destino: 'Cabinda',
    paragens: [],
    precoBase: 22000,
    distanciaKm: 700,
    activa: true
  },
  {
    id: 5,
    origem: 'Luanda',
    destino: 'Malanje',
    paragens: [{ cidade: 'Ndalatando', precoAcrescido: 5000 }],
    precoBase: 9000,
    distanciaKm: 360,
    activa: true
  },
  {
    id: 6,
    origem: 'Benguela',
    destino: 'Huambo',
    paragens: [],
    precoBase: 6500,
    distanciaKm: 200,
    activa: true
  },
  {
    id: 7,
    origem: 'Luanda',
    destino: 'Uíge',
    paragens: [{ cidade: 'Ndalatando', precoAcrescido: 6000 }],
    precoBase: 14000,
    distanciaKm: 480,
    activa: false
  }
]

export const horarios: Horario[] = [
  { id: 1, rotaId: 1, data: '2026-08-08', horaPartida: '07:00', autocarroId: 1, motoristaId: 1, lugaresTotais: 48, lugaresOcupados: 41, precoBase: 15000, estado: 'em_rota' },
  { id: 2, rotaId: 2, data: '2026-08-08', horaPartida: '13:30', autocarroId: 2, motoristaId: 2, lugaresTotais: 44, lugaresOcupados: 30, precoBase: 18500, estado: 'agendado' },
  { id: 3, rotaId: 5, data: '2026-08-08', horaPartida: '09:15', autocarroId: 5, motoristaId: 5, lugaresTotais: 40, lugaresOcupados: 40, precoBase: 9000, estado: 'agendado' },
  { id: 4, rotaId: 6, data: '2026-08-08', horaPartida: '15:00', autocarroId: 4, motoristaId: 6, lugaresTotais: 48, lugaresOcupados: 22, precoBase: 6500, estado: 'agendado' },
  { id: 5, rotaId: 1, data: '2026-08-07', horaPartida: '07:00', autocarroId: 4, motoristaId: 1, lugaresTotais: 48, lugaresOcupados: 48, precoBase: 15000, estado: 'concluido' },
  { id: 6, rotaId: 3, data: '2026-08-07', horaPartida: '06:30', autocarroId: 5, motoristaId: 4, lugaresTotais: 40, lugaresOcupados: 33, precoBase: 25000, estado: 'concluido' },
  { id: 7, rotaId: 4, data: '2026-08-06', horaPartida: '08:00', autocarroId: 2, motoristaId: 2, lugaresTotais: 44, lugaresOcupados: 0, precoBase: 22000, estado: 'cancelado' },
  { id: 8, rotaId: 2, data: '2026-08-09', horaPartida: '07:45', autocarroId: 1, motoristaId: 1, lugaresTotais: 48, lugaresOcupados: 12, precoBase: 18500, estado: 'agendado' },
  { id: 9, rotaId: 1, data: '2026-08-09', horaPartida: '07:00', autocarroId: 4, motoristaId: 6, lugaresTotais: 48, lugaresOcupados: 9, precoBase: 15000, estado: 'agendado' },
  { id: 10, rotaId: 5, data: '2026-08-10', horaPartida: '09:15', autocarroId: 5, motoristaId: 5, lugaresTotais: 40, lugaresOcupados: 3, precoBase: 9000, estado: 'agendado' },
  { id: 11, rotaId: 3, data: '2026-08-11', horaPartida: '06:30', autocarroId: 2, motoristaId: 4, lugaresTotais: 44, lugaresOcupados: 5, precoBase: 25000, estado: 'agendado' },
  { id: 12, rotaId: 6, data: '2026-08-05', horaPartida: '15:00', autocarroId: 4, motoristaId: 6, lugaresTotais: 48, lugaresOcupados: 48, precoBase: 6500, estado: 'concluido' }
]

export const reembolsos: Reembolso[] = [
  { id: 1, passageiroNome: 'Nzinga Lopes', passageiroEmail: 'nzinga.lopes@gmail.com', rota: 'Luanda → Benguela', dataViagem: '2026-08-09', valor: 15000, motivo: 'Imprevisto familiar — não vai poder viajar.', estado: 'pendente', dataPedido: '2026-08-07' },
  { id: 2, passageiroNome: 'Osvaldo Bumba', passageiroEmail: 'osvaldo.bumba@hotmail.com', rota: 'Luanda → Huambo', dataViagem: '2026-08-06', valor: 18500, motivo: 'Viagem cancelada pela transportadora.', estado: 'aprovado', dataPedido: '2026-08-06' },
  { id: 3, passageiroNome: 'Filomena Sango', passageiroEmail: 'filomena.sango@yahoo.com', rota: 'Luanda → Malanje', dataViagem: '2026-08-05', valor: 9000, motivo: 'Comprou o bilhete duas vezes por engano.', estado: 'aprovado', dataPedido: '2026-08-05' },
  { id: 4, passageiroNome: 'Hélder Quinanga', passageiroEmail: 'helder.quinanga@gmail.com', rota: 'Benguela → Huambo', dataViagem: '2026-08-12', valor: 6500, motivo: 'Mudança de planos de viagem.', estado: 'pendente', dataPedido: '2026-08-08' },
  { id: 5, passageiroNome: 'Custódia Neto', passageiroEmail: 'custodia.neto@gmail.com', rota: 'Luanda → Lubango', dataViagem: '2026-07-30', valor: 25000, motivo: 'Lugar atribuído incorrectamente no embarque.', estado: 'recusado', dataPedido: '2026-07-31' },
  { id: 6, passageiroNome: 'Armando Tchissingui', passageiroEmail: 'armando.tchissingui@gmail.com', rota: 'Luanda → Cabinda', dataViagem: '2026-08-15', valor: 22000, motivo: 'Doença — apresenta atestado médico.', estado: 'pendente', dataPedido: '2026-08-08' }
]

export const passageiros: Passageiro[] = [
  { id: 1, name: 'Nzinga Lopes', email: 'nzinga.lopes@gmail.com', telefone: '+244 923 118 442', dataRegisto: '2025-10-02', totalReservas: 7, ultimaViagem: '2026-07-22', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax1' } },
  { id: 2, name: 'Osvaldo Bumba', email: 'osvaldo.bumba@hotmail.com', telefone: '+244 912 774 320', dataRegisto: '2025-08-14', totalReservas: 12, ultimaViagem: '2026-08-06', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax2' } },
  { id: 3, name: 'Filomena Sango', email: 'filomena.sango@yahoo.com', telefone: '+244 934 552 981', dataRegisto: '2026-01-19', totalReservas: 3, ultimaViagem: '2026-08-05', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax3' } },
  { id: 4, name: 'Hélder Quinanga', email: 'helder.quinanga@gmail.com', telefone: '+244 927 003 118', dataRegisto: '2025-12-11', totalReservas: 5, ultimaViagem: '2026-08-01', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax4' } },
  { id: 5, name: 'Custódia Neto', email: 'custodia.neto@gmail.com', telefone: '+244 941 226 774', dataRegisto: '2025-05-27', totalReservas: 21, ultimaViagem: '2026-07-30', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax5' } },
  { id: 6, name: 'Armando Tchissingui', email: 'armando.tchissingui@gmail.com', telefone: '+244 915 668 209', dataRegisto: '2026-03-08', totalReservas: 2, ultimaViagem: '2026-06-14', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax6' } },
  { id: 7, name: 'Benedita Katiavala', email: 'benedita.katiavala@gmail.com', telefone: '+244 923 990 447', dataRegisto: '2025-02-16', totalReservas: 34, ultimaViagem: '2026-08-04', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax7' } },
  { id: 8, name: 'Eugénio Paciência', email: 'eugenio.paciencia@outlook.com', telefone: '+244 912 337 665', dataRegisto: '2025-09-30', totalReservas: 1, ultimaViagem: '2025-10-02', estado: 'bloqueado', avatar: { src: 'https://i.pravatar.cc/128?u=pax8' } },
  { id: 9, name: 'Isaltina Xavier', email: 'isaltina.xavier@gmail.com', telefone: '+244 936 114 802', dataRegisto: '2025-11-25', totalReservas: 9, ultimaViagem: '2026-07-19', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax9' } },
  { id: 10, name: 'Ricardino Fernandes', email: 'ricardino.fernandes@gmail.com', telefone: '+244 923 887 156', dataRegisto: '2024-12-04', totalReservas: 46, ultimaViagem: '2026-08-07', estado: 'activo', avatar: { src: 'https://i.pravatar.cc/128?u=pax10' } }
]

export const logsAuditoria: LogAuditoria[] = [
  { id: 1, timestamp: '2026-08-08T07:02:11', tipo: 'embarque', actor: 'Rosa Kiluanje', empresa: 'Kwanza Expresso', descricao: 'Validou 41 bilhetes QR no horário Luanda → Benguela das 07h00.' },
  { id: 2, timestamp: '2026-08-08T06:40:03', tipo: 'login', actor: 'Domingas Sachipengo', empresa: 'Kwanza Expresso', descricao: 'Sessão iniciada no portal de gestão de frota.' },
  { id: 3, timestamp: '2026-08-08T05:55:47', tipo: 'aprovacao_empresa', actor: 'Ivandro Kiala', descricao: 'Aprovou o registo da empresa Novo Horizonte Viagens.' },
  { id: 4, timestamp: '2026-08-07T19:12:30', tipo: 'reembolso', actor: 'Ivandro Kiala', descricao: 'Aprovou reembolso de 18.500 Kz para Osvaldo Bumba (Luanda → Huambo).' },
  { id: 5, timestamp: '2026-08-07T18:03:09', tipo: 'cancelamento', actor: 'Edmilson Necaca', empresa: 'Kwanza Expresso', descricao: 'Cancelou o horário Luanda → Cabinda das 08h00 de 6 de Agosto.' },
  { id: 6, timestamp: '2026-08-07T14:20:55', tipo: 'reembolso', actor: 'Ivandro Kiala', descricao: 'Recusou reembolso de Custódia Neto — fora do prazo de cancelamento.' },
  { id: 7, timestamp: '2026-08-07T09:11:02', tipo: 'embarque', actor: 'Miguel Wanga', empresa: 'Kwanza Expresso', descricao: 'Detectou tentativa de reutilização de bilhete QR na viagem Luanda → Lubango.' },
  { id: 8, timestamp: '2026-08-06T21:45:18', tipo: 'login', actor: 'Edmilson Necaca', empresa: 'Kwanza Expresso', descricao: 'Sessão iniciada no portal do publicador de rotas.' },
  { id: 9, timestamp: '2026-08-06T16:32:40', tipo: 'aprovacao_empresa', actor: 'Ivandro Kiala', descricao: 'Recusou o registo da empresa Costa Atlântica Transportes — documentação incompleta.' },
  { id: 10, timestamp: '2026-08-06T11:08:56', tipo: 'cancelamento', actor: 'Filomena Sango', descricao: 'Passageira cancelou a reserva da viagem Luanda → Malanje e pediu reembolso.' },
  { id: 11, timestamp: '2026-08-05T08:00:12', tipo: 'embarque', actor: 'Rosa Kiluanje', empresa: 'Kwanza Expresso', descricao: 'Emitiu bilhete walk-in para o horário Benguela → Huambo das 15h00.' },
  { id: 12, timestamp: '2026-08-04T22:14:37', tipo: 'login', actor: 'Ivandro Kiala', descricao: 'Sessão iniciada no backoffice de administração C-Trip.' }
]

export const mensagens: Mensagem[] = [
  { id: 1, horarioId: 5, assunto: 'Partida adiantada 15 minutos', corpo: 'Boa tarde. A vossa viagem Luanda → Benguela das 07h00 de amanhã irá partir 15 minutos mais cedo devido a manutenção preventiva no terminal. Por favor cheguem com alguma antecedência.', dataEnvio: '2026-08-07T18:30:00', destinatarios: 48 },
  { id: 2, horarioId: 7, assunto: 'Viagem cancelada — reembolso automático', corpo: 'Lamentamos informar que a viagem Luanda → Cabinda de 6 de Agosto foi cancelada por motivos operacionais. O reembolso será processado automaticamente em até 5 dias úteis.', dataEnvio: '2026-08-06T15:10:00', destinatarios: 0 }
]

export const notificacoesSeed: Notificacao[] = [
  { id: 1, unread: true, perfil: 'admin', icon: 'i-lucide-building-2', title: 'Novo pedido de registo', body: 'Kwanza Norte Rápido submeteu documentos para verificação.', date: '2026-08-08T08:05:00' },
  { id: 2, unread: true, perfil: 'admin', icon: 'i-lucide-receipt-text', title: 'Reembolso pendente', body: 'Armando Tchissingui pediu reembolso de 22.000 Kz.', date: '2026-08-08T07:40:00' },
  { id: 3, unread: false, perfil: 'admin', icon: 'i-lucide-shield-alert', title: 'Reclamação registada', body: 'Estrela do Huambo Viagens recebeu uma nova reclamação de passageiro.', date: '2026-08-07T16:22:00' },
  { id: 4, unread: true, perfil: 'frota', icon: 'i-lucide-wrench', title: 'Autocarro em manutenção', body: 'LD-90-12-EA está parado na oficina desde ontem — revisão de travões em curso.', date: '2026-08-08T09:00:00' },
  { id: 5, unread: true, perfil: 'frota', icon: 'i-lucide-clock-alert', title: 'Atraso no check-in', body: 'Adriano Chissano registou entrada às 06h10, 10 minutos depois do previsto.', date: '2026-08-08T06:12:00' },
  { id: 6, unread: false, perfil: 'frota', icon: 'i-lucide-clipboard-check', title: 'Tarefa concluída', body: 'Miguel Wanga concluiu a higienização do LD-23-45-EA.', date: '2026-08-06T15:05:00' },
  { id: 7, unread: true, perfil: 'publicador', icon: 'i-lucide-armchair', title: 'Horário quase esgotado', body: 'Luanda → Malanje das 09h15 de hoje já vendeu todos os 40 lugares.', date: '2026-08-08T08:50:00' },
  { id: 8, unread: true, perfil: 'publicador', icon: 'i-lucide-trending-up', title: 'Procura em alta', body: 'A rota Luanda → Benguela teve +18% de reservas esta semana.', date: '2026-08-08T07:15:00' },
  { id: 9, unread: false, perfil: 'publicador', icon: 'i-lucide-ban', title: 'Horário cancelado', body: 'Luanda → Cabinda de 6 de Agosto foi cancelado e os passageiros foram notificados.', date: '2026-08-06T15:12:00' }
]
