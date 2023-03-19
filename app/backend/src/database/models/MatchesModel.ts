import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import Team from './TeamModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_id',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_id',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    modelName: 'matches',
  },
);

Team.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Matches.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
