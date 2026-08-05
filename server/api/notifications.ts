import { sub } from 'date-fns'

const notificacoes = [{
  id: 1,
  unread: true,
  sender: {
    name: 'Bruno Mendes',
    email: 'bruno.mendes@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=2'
    }
  },
  body: 'enviou uma mensagem',
  date: sub(new Date(), { minutes: 7 }).toISOString()
}, {
  id: 2,
  sender: {
    name: 'Letícia Campos'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { hours: 1 }).toISOString()
}, {
  id: 3,
  unread: true,
  sender: {
    name: 'Tatiane Lima',
    email: 'tatiane.lima@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=3'
    }
  },
  body: 'enviou uma mensagem',
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 4,
  sender: {
    name: 'Carolina Nunes',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=4'
    }
  },
  body: 'adicionou você a um projeto',
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 5,
  sender: {
    name: 'Tomás Coelho',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=5'
    }
  },
  body: 'abandonou o carrinho',
  date: sub(new Date(), { hours: 7 }).toISOString()
}, {
  id: 6,
  sender: {
    name: 'Caio Tomaz',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=6'
    }
  },
  body: 'comprou seu produto',
  date: sub(new Date(), { days: 1, hours: 3 }).toISOString()
}, {
  id: 7,
  unread: true,
  sender: {
    name: 'Camila Ferreira',
    email: 'camila.ferreira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'enviou uma mensagem',
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 8,
  sender: {
    name: 'Juliana Pereira',
    email: 'juliana.pereira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'solicitou um reembolso',
  date: sub(new Date(), { days: 5, hours: 4 }).toISOString()
}, {
  id: 9,
  unread: true,
  sender: {
    name: 'Marina Andrade',
    email: 'marina.andrade@example.com'
  },
  body: 'enviou uma mensagem',
  date: sub(new Date(), { days: 6 }).toISOString()
}, {
  id: 10,
  sender: {
    name: 'Diego Martins'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 6 }).toISOString()
}, {
  id: 11,
  sender: {
    name: 'Rafael Souza'
  },
  body: 'abandonou o carrinho',
  date: sub(new Date(), { days: 7 }).toISOString()
}, {
  id: 12,
  sender: {
    name: 'João Teixeira'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 9 }).toISOString()
}, {
  id: 13,
  sender: {
    name: 'Camila Ferreira',
    email: 'camila.ferreira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 10 }).toISOString()
}, {
  id: 14,
  sender: {
    name: 'Juliana Pereira',
    email: 'juliana.pereira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 11 }).toISOString()
}, {
  id: 15,
  sender: {
    name: 'Marina Andrade'
  },
  body: 'comprou seu produto',
  date: sub(new Date(), { days: 12 }).toISOString()
}, {
  id: 16,
  sender: {
    name: 'Diego Martins',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=16'
    }
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 13 }).toISOString()
}, {
  id: 17,
  sender: {
    name: 'Rafael Souza'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 14 }).toISOString()
}, {
  id: 18,
  sender: {
    name: 'João Teixeira'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 15 }).toISOString()
}, {
  id: 19,
  sender: {
    name: 'Camila Ferreira',
    email: 'camila.ferreira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 16 }).toISOString()
}, {
  id: 20,
  sender: {
    name: 'Juliana Pereira',
    email: 'juliana.pereira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'comprou seu produto',
  date: sub(new Date(), { days: 17 }).toISOString()
}, {
  id: 21,
  sender: {
    name: 'Marina Andrade'
  },
  body: 'abandonou o carrinho',
  date: sub(new Date(), { days: 17 }).toISOString()
}, {
  id: 22,
  sender: {
    name: 'Diego Martins'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 18 }).toISOString()
}, {
  id: 23,
  sender: {
    name: 'Rafael Souza'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 19 }).toISOString()
}, {
  id: 24,
  sender: {
    name: 'João Teixeira',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=24'
    }
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 20 }).toISOString()
}, {
  id: 25,
  sender: {
    name: 'Camila Ferreira',
    email: 'camila.ferreira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 20 }).toISOString()
}, {
  id: 26,
  sender: {
    name: 'Juliana Pereira',
    email: 'juliana.pereira@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'abandonou o carrinho',
  date: sub(new Date(), { days: 21 }).toISOString()
}, {
  id: 27,
  sender: {
    name: 'Marina Andrade'
  },
  body: 'inscreveu-se na sua lista de e-mails',
  date: sub(new Date(), { days: 22 }).toISOString()
}]

export default eventHandler(async () => {
  return notificacoes
})
