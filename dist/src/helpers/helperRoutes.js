"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("../controllers/helper"));
const controller = new helper_1.default();
exports.default = () => {
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
