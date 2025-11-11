export const WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'COMPONENTE',
    'BIBLIOTECA',
    'INTERFACE',
    'FRONTEND',
    'BACKEND',
    'SERVIDOR',
    'NAVEGADOR'
] as const;

export const TIPS: { [key: string]: string } = {
    'REACT': 'Biblioteca para criar interfaces Web com Javascript.',
    'JAVASCRIPT': 'Linguagem de programação web.',
    'TYPESCRIPT': 'Superset tipado do JavaScript.',
    'COMPONENTE': 'Unidade reutilizável de UI.',
    'BIBLIOTECA': 'Conjunto de código reutilizável.',
    'INTERFACE': 'Contrato de tipos no TypeScript.',
    'FRONTEND': 'Parte visual da aplicação.',
    'BACKEND': 'Parte do servidor da aplicação.',
    'SERVIDOR': 'Máquina que hospeda aplicações.',
    'NAVEGADOR': 'Programa para acessar a web.'
};

export const GAME_CONFIG = {
    MAX_ATTEMPTS: 10,
    DEFAULT_TIP: 'Adivinhe a palavra!'
} as const;
