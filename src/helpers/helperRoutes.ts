import { RouteOptions } from "fastify";
import Controller from "../controllers/helper";

const controller = new Controller();

export default (): RouteOptions[] => {
    return [
        {
            method: "GET",
            url: "/feedbacks/recieve/:userId",
            handler: controller.listRecieveFeedbacks,
        },
        {
            method: "GET",
            url: "/feedbacks/send/:userId",
            handler: controller.listSendFeedbacks,
        },
        {
            method: "GET",
            url: "/goals/:userId",
            handler: controller.listGoalsFromUser,
        },

        {
            method: "GET",
            url: "/teams/mananger/:userId",
            handler: controller.listTeamsByMananger,
        },
        {
            method: "GET",
            url: "/teams/in/:teamId",
            handler: controller.listTeam,
        },
        {
            method: "GET",
            url: "/goals/team/:manangerId",
            handler: controller.listGoalsByMananger,
        },
    ];
};
