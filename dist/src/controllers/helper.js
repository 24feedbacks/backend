"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Feedback_1 = __importDefault(require("../entities/Feedback"));
const feedback_1 = __importDefault(require("../services/feedback"));
const Goal_1 = __importDefault(require("../entities/Goal"));
const goals_1 = __importDefault(require("../services/goals"));
const Team_1 = __importDefault(require("../entities/Team"));
const teamService_1 = __importDefault(require("../services/teamService"));
class UserController {
    Feedback = new feedback_1.default(Feedback_1.default);
    goals = new goals_1.default(Goal_1.default);
    teams = new teamService_1.default(Team_1.default);
    listRecieveFeedbacks = async (req, res) => {
        try {
            const { userId } = req.params;
            const feedbacks = await this.Feedback.listRecieve(userId);
            feedbacks.length > 0
                ? res.status(200).send(feedbacks)
                : res.status(404).send({ message: "Feedbacks not found" });
        }
        catch (err) {
            console.log(err);
        }
    };
    listSendFeedbacks = async (req, res) => {
        try {
            const { userId } = req.params;
            const feedbacks = await this.Feedback.listSend(userId);
            feedbacks.length > 0
                ? res.status(200).send(feedbacks)
                : res.status(404).send({ message: "Feedbacks not found" });
        }
        catch (err) {
            console.log(err);
        }
    };
    listGoalsFromUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const goals = await this.goals.list(userId);
            goals.length > 0
                ? res.status(200).send(goals)
                : res.status(404).send({ message: "goals not found" });
        }
        catch (err) {
            console.log(err);
        }
    };
    listTeamsByMananger = async (req, res) => {
        try {
            const { manangerId } = req.params;
            const teams = await this.teams.listTeamsByMananger(manangerId);
            teams.length > 0
                ? res.status(200).send(teams)
                : res.status(404).send({ message: "teams not found" });
        }
        catch (err) {
            console.log(err);
        }
    };
    listTeam = async (req, res) => {
        try {
            const { teamId } = req.params;
            const teams = await this.teams.listTeam(teamId);
            teams.length > 0
                ? res.status(200).send(teams)
                : res.status(404).send({ message: "teams not found" });
        }
        catch (err) {
            console.log(err);
        }
    };
    listGoalsByMananger = async (req, res) => {
        try {
            const { manangerId } = req.params;
            const goals = await this.goals.listByMananger(manangerId);
            if (goals) {
                goals.length > 0
                    ? res.status(200).send(goals)
                    : res.status(404).send({ message: "goals not found" });
            }
        }
        catch (err) {
            console.log(err);
        }
    };
}
exports.default = UserController;
