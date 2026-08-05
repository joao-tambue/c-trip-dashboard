import { sub } from 'date-fns'

const emails = [{
  id: 1,
  from: {
    name: 'Alexandre Silva',
    email: 'alexandre.silva@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=1'
    }
  },
  subject: 'Agenda de Reunião: Revisão da Estratégia de Marketing do Q1',
  body: `Olá, equipe,

Espero que este e-mail os encontre bem. Apenas um lembrete sobre nossa reunião de Estratégia de Marketing do Q1 marcada para amanhã às 10h (horário da costa leste) na Sala de Conferências A.

Pauta:
- Revisão do desempenho do Q4
- Propostas de novas campanhas
- Alocação de orçamento para o Q2
- Planejamento de recursos da equipe

Por favor, venham preparados com as atualizações do seu departamento. Anexei o deck preliminar para a sua revisão.

Atenciosamente,
Alexandre Silva
Diretor Sênior de Marketing
Tel: (555) 123-4567`,
  date: new Date().toISOString()
}, {
  id: 2,
  unread: true,
  from: {
    name: 'Bruno Mendes',
    email: 'bruno.mendes@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=2'
    }
  },
  subject: 'RES: Projeto Phoenix - Atualização da Sprint 3',
  body: `Olá, equipe,

Atualização rápida sobre as entregas da Sprint 3:

✅ Módulo de autenticação de usuários concluído
🏗️ Integração de pagamentos em 80%
⏳ Documentação da API aguardando revisão

Principais métricas:
- Cobertura de código: 94%
- Velocidade da sprint: 45 pontos
- Taxa de resolução de bugs: 98%

Por favor, revisem o relatório anexo para uma análise detalhada. Vamos discutir os impedimentos no stand-up de amanhã.

Atenciosamente,
Bruno

--
Bruno Mendes
Desenvolvedor Líder | Tech Solutions
Celular: +55 (11) 98765-4321`,
  date: sub(new Date(), { minutes: 7 }).toISOString()
}, {
  id: 3,
  unread: true,
  from: {
    name: 'Tatiane Lima',
    email: 'tatiane.lima@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=3'
    }
  },
  subject: 'Planos para o Almoço',
  body: `Olá!

Eu queria saber se você topa almoçar nesta sexta-feira. Há um restaurante mexicano incrível no centro chamado "La Casa" que eu estava querendo experimentar. Eles são conhecidos pelos tacos autênticos e guacamole caseiro.

O horário das 12h30 funciona para você? Seria ótimo colocar o papo em dia e discutir o próximo evento de integração da equipe enquanto estivermos lá.

Me diga o que acha!

Abraços,
Tatiane`,
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 4,
  from: {
    name: 'Mariana Alves',
    email: 'mariana.alves@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=4'
    }
  },
  subject: 'Nova Proposta: Projeto Horizon',
  body: `Olá, equipe,

Acabei de enviar a proposta completa do Projeto Horizon para o nosso drive compartilhado. O documento inclui:

• Objetivos detalhados do projeto e métricas de sucesso
• Alocação de recursos e estrutura da equipe
• Cronograma com os principais marcos
• Detalhamento de orçamento
• Avaliação de riscos e estratégias de mitigação

Estou especialmente animada com a nossa abordagem inovadora para o componente de engajamento de usuários, que pode estabelecer um novo padrão para o nosso setor.

Vocês poderiam revisar e dar feedback até sexta-feira ao final do expediente? Gostaria de apresentar isso ao comitê diretivo na próxima semana.

Desde já agradeço,

Mariana Alves
Gerente Sênior de Projetos
Tel: (555) 234-5678`,
  date: sub(new Date(), { days: 1 }).toISOString()
}, {
  id: 5,
  from: {
    name: 'Carlos Rocha',
    email: 'carlos.rocha@example.com'
  },
  subject: 'Atualizado: Itinerário da Viagem para a Conferência de São Francisco',
  body: `Prezado(a) [Nome],

Confira abaixo o seu itinerário de viagem confirmado:

DETALHES DO VOO:
Ida: AA 1234
Data: 15 de março de 2024
PARTIDA: JFK 09h30
CHEGADA: SFO 12h45

HOTEL:
Marriott São Francisco
Check-in: 15 de março
Check-out: 18 de março
Confirmação nº: MR123456

PROGRAMAÇÃO:
15 de março - Noite: Recepção de boas-vindas (18h)
16 de março - Conferência dia 1 (9h às 17h)
17 de março - Conferência dia 2 (9h às 16h)

Por favor, me avise se precisar de alguma alteração.

Atenciosamente,
Carlos Rocha
Coordenador de Viagens
Escritório: (555) 345-6789`,
  date: sub(new Date(), { days: 1 }).toISOString()
}, {
  id: 6,
  from: {
    name: 'Juliana Pereira',
    email: 'juliana.pereira@example.com'
  },
  subject: 'Revisão do Desempenho Financeiro do Q1 2024',
  body: `Prezada Liderança,

Segue anexo o nosso relatório de análise financeira do Q1 2024. Principais destaques:

MÉTRICAS DE DESEMPENHO:
• Receita: R$ 12,4 mi (+15% em relação ao ano anterior)
• Despesas operacionais: R$ 8,2 mi (-3% vs. orçamento)
• Margem de lucro líquido: 18,5% (+2,5% vs. Q4 2023)

ÁREAS DE OTIMIZAÇÃO:
1. Custos de infraestrutura em nuvem (+22% acima do orçamento)
2. Eficiência dos gastos de marketing (-8% de ROI vs. meta)
3. Custos operacionais do escritório (+5% vs. previsão)

Agendei uma revisão detalhada para quinta-feira às 14h (horário da costa leste). O convite de calendário seguirá.

Atenciosamente,
Juliana Pereira
Diretora Financeira
Ramal: 4567`,
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 7,
  from: {
    name: 'Rafael Souza',
    email: 'rafael.souza@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=7'
    }
  },
  subject: '[Obrigatório] Nova Sessão de Treinamento de Ferramentas DevOps',
  body: `Olá, Equipe de Desenvolvimento,

Este é um lembrete sobre a sessão de treinamento obrigatória da próxima semana sobre o nosso conjunto de ferramentas DevOps atualizado.

📅 Data: terça-feira, 19 de março
⏰ Horário: 10h às 12h30 (horário da costa leste)
📍 Local: Virtual (link do Zoom abaixo)

Abordaremos:
• Melhorias no pipeline CI/CD do GitLab
• Otimização de containers Docker
• Gerenciamento de clusters Kubernetes
• Integração de novas ferramentas de monitoramento

Pré-requisitos:
1. Instalar o Docker Desktop 4.25
2. Atualizar o VS Code para a versão mais recente
3. Preencher a pesquisa pré-treinamento (link anexo)

Link do Zoom: https://zoom.us/j/123456789
Senha: DevOps2024

--
Rafael Souza
Líder de DevOps
Operações Técnicas
Cel: (555) 777-8888`,
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 8,
  unread: true,
  from: {
    name: 'Camila Ferreira',
    email: 'camila.ferreira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  subject: '🎉 Feliz Aniversário!',
  body: `Prezado(a) [Nome],

Em nome de toda a equipe, desejamos a você um aniversário fantástico! 🎂

Organizamos uma pequena comemoração na sala de descanso às 15h de hoje. Teremos bolo e lanches!

A sua dedicação e energia positiva tornam o nosso ambiente de trabalho melhor todos os dias. Felicidades por mais um grande ano!

Melhores votos,
Camila e a Equipe de RH

P.S. Não deixe de verificar o seu e-mail para uma surpresa especial de aniversário da empresa! 🎁

--
Camila Ferreira
Diretora de RH
Departamento de Recursos Humanos
Tel: (555) 999-0000`,
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 9,
  from: {
    name: 'Diego Martins',
    email: 'diego.martins@example.com'
  },
  subject: 'Solicitação de Feedback para o Redesign do Site - Fase 2',
  body: `Olá,

Estamos entrando na Fase 2 do projeto de redesign do nosso site e gostaríamos da sua opinião sobre as iterações mais recentes.

Implementação de Novas Funcionalidades:
1. Catálogo de produtos dinâmico
2. Funcionalidade de busca aprimorada
3. Painel de usuário personalizado
4. Navegação responsiva para dispositivos móveis

Links para Revisão:
• Ambiente de Staging: https://staging.example.com
• Especificações de Design: [Link do Figma]
• Documentação do Fluxo do Usuário: [Link do Confluence]

Envie o seu feedback até sexta-feira ao final do expediente. Áreas-chave para focar:
- Experiência do usuário
- Fluxo de navegação
- Hierarquia de conteúdo
- Responsividade móvel

Suas percepções serão cruciais para as nossas decisões finais de implementação.

Desde já agradeço,
Diego Martins
Líder de Design de UX
Equipe de Design de Produto`,
  date: sub(new Date(), { days: 5 }).toISOString()
}, {
  id: 10,
  from: {
    name: 'João Teixeira',
    email: 'joao.teixeira@example.com'
  },
  subject: 'Programa de Bem-Estar Corporativo - Renovação de Assinatura',
  body: `Prezado(a) Membro,

A sua assinatura do programa de bem-estar corporativo precisa ser renovada em 1º de abril de 2024.

NOVAS COMODIDADES:
✨ Estúdio de yoga ampliado
🏋️ Equipamentos de cardio de última geração
🧘 Sala de meditação
👥 Aulas de ginástica em grupo adicionais

BENEFÍCIOS DA RENOVAÇÃO:
• 15% de desconto para inscrições antecipadas
• 3 sessões de treinamento pessoal gratuitas
• Avaliação de bem-estar gratuita
• Acesso ao novo aplicativo móvel

Para agendar uma visita ou discutir as opções de renovação, reserve um horário aqui: [Link de Agendamento]

Mantenha-se saudável!

Atenciosamente,
João Teixeira
Coordenador de Bem-Estar Corporativo
Centro de Fitness Downtown
Tel: (555) 123-7890`,
  date: sub(new Date(), { days: 5 }).toISOString()
}, {
  id: 11,
  unread: true,
  from: {
    name: 'Marina Andrade',
    email: 'marina.andrade@example.com'
  },
  subject: 'Importante: Atualizações da Sua Apólice de Seguro Corporativo',
  body: `Prezado(a) [Nome do Funcionário],

Este e-mail contém informações importantes sobre as mudanças na sua cobertura de seguro corporativo com vigência em 1º de abril de 2024.

PRINCIPAIS ATUALIZAÇÕES:
1. Plano de Saúde
   • Coparticipação reduzida para consultas com especialistas (R$ 35 → R$ 25)
   • Cobertura de telemedicina ampliada
   • Novos benefícios de saúde mental

2. Cobertura Odontológica
   • Teto anual aumentado (R$ 1.500 → R$ 2.000)
   • Adicionada cobertura ortodôntica para dependentes

3. Benefícios de Visão
   • Franquia de armações aprimorada
   • Novo programa de desconto em LASIK

Revise a documentação anexa com atenção e preencha o formulário de confirmação até 25 de março.

Dúvidas? Participe da nossa sessão informativa virtual:
📅 20 de março de 2024
⏰ 11h (horário da costa leste)
🔗 [Link do Teams]

Atenciosamente,
Marina Andrade
Coordenadora de Benefícios
Departamento de RH`,
  date: sub(new Date(), { days: 12 }).toISOString()
}, {
  id: 12,
  from: {
    name: 'Caio Tomaz',
    email: 'caio.tomaz@example.com'
  },
  subject: '📚 Encontro do Clube do Livro de Março: "O Grande Gatsby"',
  body: `Olá, Amantes de Livros!

Espero que vocês estejam aproveitando a obra-prima de F. Scott Fitzgerald! Detalhes do nosso próximo encontro:

📅 quinta-feira, 21 de março
⏰ 17h30 às 19h
📍 Sala de Conferências Principal (ou Zoom)

Tópicos de Discussão:
1. O simbolismo da luz verde
2. O tema do Sonho Americano
3. Desenvolvimento dos personagens
4. Crítica social

Tragam as suas sugestões para a seleção de leitura de abril!

Teremos lanches 🍪

Confirme presença respondendo a este e-mail.

Boa leitura!
Caio

--
Caio Tomaz
Coordenador do Clube do Livro
Comitê de Cultura Interna`,
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 13,
  from: {
    name: 'Jaqueline Castro',
    email: 'jaqueline.castro@example.com'
  },
  subject: '🍳 Projeto Livro de Receitas da Empresa - Lembrete de Envio de Receitas',
  body: `Prezados Colegas,

Última chamada para as inscrições do nosso projeto do livro de receitas da empresa!

Diretrizes para o Envio de Receitas:
1. Incluir lista de ingredientes com medidas
2. Instruções passo a passo
3. Tempo de preparo e porções
4. Foto do prato final (opcional)
5. Qualquer significado cultural ou pessoal

Prazo de Envio: 22 de março de 2024

Já temos algumas inscrições incríveis:
• O Chili Famoso da Sara
• A Massa Mediterrânea do Miguel
• Os Brownies Veganos da Lívia
• A Paella da Família do Tomás

Toda a renda das vendas do livro apoiará o nosso banco de alimentos local.

Envie aqui: [Link do Formulário]

Cozinhando juntos,
Jaqueline Castro
Comitê de Engajamento Comunitário
Ramal 5432`,
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 14,
  from: {
    name: 'Renata Batista',
    email: 'renata.batista@example.com'
  },
  subject: '🧘‍♀️ Agenda de Bem-Estar Corporativo Atualizada - Primavera 2024',
  body: `Prezados Participantes do Programa de Bem-Estar,

A nossa agenda de bem-estar da primavera de 2024 já está disponível!

NOVAS AULAS:
Segunda-feira:
• 7h30 - Yoga de Fluxo Matinal
• 12h15 - HIIT Express
• 17h30 - Fundamentos de Meditação

Quarta-feira:
• 8h - Power Vinyasa
• 12h - Alongamento no Trabalho
• 16h30 - Oficina de Atenção Plena

Sexta-feira:
• 7h45 - Yoga Suave
• 12h30 - Gerenciamento de Estresse
• 16h45 - Relaxamento de Fim de Semana

Todas as aulas estão disponíveis presencialmente e via Zoom.
Baixe o nosso aplicativo para reservar o seu lugar!

Namastê,
Renata Batista
Instrutora de Bem-Estar Corporativo
Equipe de Bem-Estar e Benefícios`,
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 15,
  from: {
    name: 'Karina Almeida',
    email: 'karina.almeida@example.com'
  },
  subject: '📚 Evento de Lançamento do Livro: "Transformação Digital na Era Moderna"',
  body: `Prezado(a) [Nome],

Você está cordialmente convidado(a) para o lançamento do meu novo livro, "Transformação Digital na Era Moderna: Um Guia para Líderes"

DETALHES DO EVENTO:
📅 Data: 15 de abril de 2024
⏰ Horário: 18h às 20h30 (horário da costa leste)
📍 Grand Hotel Downtown
   123 Business Ave.

PAUTA:
18h - Recepção de boas-vindas
18h30 - Apresentação principal
19h15 - Sessão de perguntas e respostas
19h45 - Sessão de autógrafos
20h - Networking

Serviremos um coquetel leve.
Cada participante receberá uma cópia autografada do livro.

Confirme presença até 1º de abril: [Link do Evento]

Aguardo ansiosamente por este marco com vocês!

Atenciosamente,
Karina Almeida
Consultora de Estratégia Digital
Autora, "Transformação Digital na Era Moderna"`,
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 16,
  from: {
    name: 'Daniel Moreira',
    email: 'daniel.moreira@example.com'
  },
  subject: '🚀 TechCon 2024: Inscrições com Desconto Antecipado Abertas',
  body: `Prezados Entusiastas de Tecnologia,

As inscrições para a TechCon 2024: "Inovação em Escala" já estão abertas!

DESTAQUES DA CONFERÊNCIA:
📅 15 a 17 de maio de 2024
📍 Centro de Convenções de Tecnologia

PALESTRANTES PRINCIPAIS:
• Sarah Johnson - CEO, Future Tech Inc.
• Dr. Michael Chang - Diretor de Pesquisa em IA
• Lisa Rodriguez - Especialista em Cibersegurança

TRILHAS:
1. Inovação em IA/ML
2. Arquitetura em Nuvem
3. DevSecOps
4. Transformação Digital
5. Tecnologias Emergentes

PREÇO PROMOCIONAL (até 1º de abril):
Passaporte Completo da Conferência: R$ 899 (de R$ 1.199)
Desconto para Equipes (5+): 15% off

Inscreva-se aqui: [Link de Inscrição]

Atenciosamente,
Daniel Moreira
Diretor da Conferência
TechCon 2024`,
  date: sub(new Date(), { months: 1, days: 4 }).toISOString()
}, {
  id: 17,
  from: {
    name: 'André Tomás',
    email: 'andre.tomas@example.com'
  },
  subject: '🎨 Perspectivas Modernas: Exposição de Arte Contemporânea',
  body: `Olá,

Espero que você esteja bem! Queria convidar você pessoalmente para uma exposição de arte extraordinária neste fim de semana.

"Perspectivas Modernas: Quebrando Fronteiras"
📅 Sábado e domingo
⏰ 10h às 18h
📍 Galeria de Arte Metropolitana

ARTISTAS DESTACADOS:
• Maria Chen - Mídia mista
• James Wright - Arte digital
• Sofia Patel - Instalação
• Robert Kim - Fotografia

EVENTOS ESPECIAIS:
• Conversa com artistas: sábado, 14h
• Oficina: domingo, 11h
• Recepção com vinhos: sábado, 17h

Adoraria encontrá-lo(a) lá! Me avise se quiser ir junto.

Abraços,
André Tomás
Curador
Galeria de Arte Metropolitana
Tel: (555) 234-5678`,
  date: sub(new Date(), { months: 1, days: 15 }).toISOString()
}, {
  id: 18,
  from: {
    name: 'Júlia Garcia',
    email: 'julia.garcia@example.com'
  },
  subject: '🤝 Evento de Networking do Setor: "Conecte e Inove 2024"',
  body: `Prezada Rede Profissional,

Você está convidado(a) para o nosso principal evento de networking!

DETALHES DO EVENTO:
📅 28 de março de 2024
⏰ 18h às 21h
📍 Innovation Hub
   456 Enterprise Street

PALESTRANTES:
• Mark Thompson - "O Futuro do Trabalho"
• Dra. Sarah Chen - "Tendências de Inovação"
• Robert Mills - "Liderança Digital"

PROGRAMAÇÃO:
18h - Credenciamento e boas-vindas
18h30 - Apresentações principais
19h30 - Sessão de networking
20h30 - Painel de discussão

Serviremos canapés e bebidas.

Confirmação de presença obrigatória: [Link de Inscrição]

Atenciosamente,
Júlia Garcia
Coordenadora de Eventos
Associação de Networking Profissional`,
  date: sub(new Date(), { months: 1, days: 18 }).toISOString()
}, {
  id: 19,
  from: {
    name: 'Tiago Rodrigues',
    email: 'tiago.rodrigues@example.com'
  },
  subject: '🌟 Dia de Serviço Comunitário - Oportunidades de Voluntariado',
  body: `Prezados Colegas,

Junte-se a nós no nosso Dia de Serviço Comunitário anual!

DETALHES DO EVENTO:
📅 sábado, 6 de abril de 2024
⏰ 9h às 15h
📍 Locais Múltiplos

OPORTUNIDADES DE VOLUNTARIADO:
1. Limpeza do Parque da Cidade
   • Manutenção de jardins
   • Restauração de trilhas
   • Reparo do parquinho

2. Banco de Alimentos
   • Triagem de doações
   • Montagem de marmitas
   • Distribuição

3. Abrigo de Animais
   • Passeios com cães
   • Limpeza das instalações
   • Apoio nas redes sociais

Todos os voluntários recebem:
• Camiseta de voluntário da empresa
• Almoço e lanches
• Certificado de participação
• 8 horas de crédito de serviço comunitário

Inscreva-se aqui: [Portal do Voluntário]

Fazendo a diferença juntos,
Tiago Rodrigues
Coordenador de Ação Comunitária
Equipe de Responsabilidade Social Corporativa`,
  date: sub(new Date(), { months: 1, days: 25 }).toISOString()
}, {
  id: 20,
  from: {
    name: 'Murilo Lopes',
    email: 'murilo.lopes@example.com'
  },
  subject: '🚗 Lembrete de Manutenção do Veículo: Revisão dos 30.000 Km',
  body: `Prezado(a) Cliente,

O seu veículo está com a revisão de manutenção dos 30.000 km vencida.

SERVIÇOS RECOMENDADOS:
• Troca de óleo e filtro
• Rodízio e alinhamento de pneus
• Inspeção do sistema de freios
• Inspeção de segurança de múltiplos pontos
• Verificação e completar nível de fluidos
• Teste de desempenho da bateria

DETALHES DA CENTRAL DE SERVIÇOS:
📍 Downtown Auto Care
   789 Service Road

☎️ (555) 987-6543

Horários Disponíveis:
• Segunda a sexta: 7h30 às 18h
• Sábado: 8h às 14h

Agende online: [Link de Agendamento]
ou ligue diretamente para a nossa central de atendimento.

Dirija com segurança,
Murilo Lopes
Coordenador de Serviços
Downtown Auto Care
Emergência: (555) 987-6544`,
  date: sub(new Date(), { months: 2 }).toISOString()
}]

export default eventHandler(async () => {
  return emails
})
