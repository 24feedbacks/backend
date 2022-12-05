import { Request, Response } from "../types/http";
import Feedback from "../entities/Feedback";
import FeedbackService from "../services/feedback";
import Goal from "../entities/Goal";
import GoalsService from "../services/goals";
import Team from "../entities/Team";
import TeamService from "../services/teamService";

export default class UserController {
    private Feedback = new FeedbackService(Feedback);
    private goals = new GoalsService(Goal);
    private teams = new TeamService(Team);

    listRecieveFeedbacks = async (req: Request, res: Response) => {
        try {
            const { userId } = <any>req.params;

            const feedbacks = await this.Feedback.listRecieve(userId);

            feedbacks.length > 0
                ? res.status(200).send(feedbacks)
                : res.status(404).send({ message: "Feedbacks not found" });
        } catch (err) {
            console.log(err);
        }
    };

    listSendFeedbacks = async (req: Request, res: Response) => {
        try {
            const { userId } = <any>req.params;

            const feedbacks = await this.Feedback.listSend(userId);

            feedbacks.length > 0
                ? res.status(200).send(feedbacks)
                : res.status(404).send({ message: "Feedbacks not found" });
        } catch (err) {
            console.log(err);
        }
    };

    listGoalsFromUser = async (req: Request, res: Response) => {
        try {
            const { userId } = <any>req.params;
            const goals = await this.goals.list(userId);

            goals.length > 0
                ? res.status(200).send(goals)
                : res.status(404).send({ message: "goals not found" });
        } catch (err) {
            console.log(err);
        }
    };

    listTeamsByMananger = async (req: Request, res: Response) => {
        try {
            const { manangerId } = <any>req.params;
            const teams = await this.teams.listTeamsByMananger(manangerId);

            teams.length > 0
                ? res.status(200).send(teams)
                : res.status(404).send({ message: "teams not found" });
        } catch (err) {
            console.log(err);
        }
    };

    listTeam = async (req: Request, res: Response) => {
        try {
            const { teamId } = <any>req.params;
            const teams = await this.teams.listTeam(teamId);

            teams.length > 0
                ? res.status(200).send(teams)
                : res.status(404).send({ message: "teams not found" });
        } catch (err) {
            console.log(err);
        }
    };

    listGoalsByMananger = async (req: Request, res: Response) => {
        try {
            const { manangerId } = <any>req.params;
            const goals = await this.goals.listByMananger(manangerId);

            if (goals) {
                goals.length > 0
                    ? res.status(200).send(goals)
                    : res.status(404).send({ message: "goals not found" });
            }
        } catch (err) {
            console.log(err);
        }
    };
}
