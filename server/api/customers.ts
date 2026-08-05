import type { Usuario } from '~/types'

const clientes: Usuario[] = [{
  id: 1,
  name: 'Alexandre Silva',
  email: 'alexandre.silva@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=1'
  },
  status: 'inscrito',
  location: 'Nova York, EUA'
}, {
  id: 2,
  name: 'Bruno Mendes',
  email: 'bruno.mendes@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=2'
  },
  status: 'nao_inscrito',
  location: 'Londres, Reino Unido'
}, {
  id: 3,
  name: 'Tatiane Lima',
  email: 'tatiane.lima@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=3'
  },
  status: 'rejeitado',
  location: 'Paris, França'
}, {
  id: 4,
  name: 'Mariana Alves',
  email: 'mariana.alves@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=4'
  },
  status: 'inscrito',
  location: 'Berlim, Alemanha'
}, {
  id: 5,
  name: 'Carlos Rocha',
  email: 'carlos.rocha@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=5'
  },
  status: 'inscrito',
  location: 'Tóquio, Japão'
}, {
  id: 6,
  name: 'Juliana Pereira',
  email: 'juliana.pereira@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=6'
  },
  status: 'inscrito',
  location: 'Sydney, Austrália'
}, {
  id: 7,
  name: 'Rafael Souza',
  email: 'rafael.souza@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=7'
  },
  status: 'inscrito',
  location: 'Nova York, EUA'
}, {
  id: 8,
  name: 'Camila Ferreira',
  email: 'camila.ferreira@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=8'
  },
  status: 'inscrito',
  location: 'Londres, Reino Unido'
}, {
  id: 9,
  name: 'Diego Martins',
  email: 'diego.martins@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=9'
  },
  status: 'rejeitado',
  location: 'Paris, França'
}, {
  id: 10,
  name: 'João Teixeira',
  email: 'joao.teixeira@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=10'
  },
  status: 'inscrito',
  location: 'Berlim, Alemanha'
}, {
  id: 11,
  name: 'Marina Andrade',
  email: 'marina.andrade@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=11'
  },
  status: 'inscrito',
  location: 'Tóquio, Japão'
}, {
  id: 12,
  name: 'Caio Tomaz',
  email: 'caio.tomaz@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=12'
  },
  status: 'nao_inscrito',
  location: 'Sydney, Austrália'
}, {
  id: 13,
  name: 'Jaqueline Castro',
  email: 'jaqueline.castro@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=13'
  },
  status: 'nao_inscrito',
  location: 'Nova York, EUA'
}, {
  id: 14,
  name: 'Renata Batista',
  email: 'renata.batista@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=14'
  },
  status: 'nao_inscrito',
  location: 'Londres, Reino Unido'
}, {
  id: 15,
  name: 'Karina Almeida',
  email: 'karina.almeida@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=15'
  },
  status: 'inscrito',
  location: 'Paris, França'
}, {
  id: 16,
  name: 'Daniel Moreira',
  email: 'daniel.moreira@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=16'
  },
  status: 'inscrito',
  location: 'Berlim, Alemanha'
}, {
  id: 17,
  name: 'André Tomás',
  email: 'andre.tomas@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=17'
  },
  status: 'nao_inscrito',
  location: 'Tóquio, Japão'
}, {
  id: 18,
  name: 'Júlia Garcia',
  email: 'julia.garcia@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=18'
  },
  status: 'inscrito',
  location: 'Sydney, Austrália'
}, {
  id: 19,
  name: 'Tiago Rodrigues',
  email: 'tiago.rodrigues@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=19'
  },
  status: 'rejeitado',
  location: 'Nova York, EUA'
}, {
  id: 20,
  name: 'Murilo Lopes',
  email: 'murilo.lopes@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=20'
  },
  status: 'inscrito',
  location: 'Londres, Reino Unido'
}]

export default eventHandler(async () => {
  return clientes
})
