const match = [
  {
    id: 4,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Botafogo',
    },
    awayTeam: {
      teamName: 'Bahia',
    },
  },
];

const onGoingMatch = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Avaí',
    },
    awayTeam: {
      teamName: 'Bahia',
    },
  },
];

export default { match, onGoingMatch };
