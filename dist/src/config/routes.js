"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesV1 = void 0;
const usersRoot = "users";
const chatRoot = "chats";
const sourceRoot = "source";
const discussionRoot = "discussions";
const evaluationRoot = "evaluation";
const v1 = "v1";
exports.routesV1 = {
    prefix: "api",
    version: v1,
    user: {
        root: usersRoot,
        delete: `/${usersRoot}/:id`,
        discussions: `/${usersRoot}/:userId/discussions`,
    },
    chat: {
        root: chatRoot,
        addChatToDiscussion: `/${chatRoot}/:discussionId`,
        sources: `/${chatRoot}/:chatId/sources`,
        evaluation: `/${chatRoot}/:chatId/evaluation`,
        update: `/${chatRoot}/:chatId`,
        uploadFIle: `/${chatRoot}/upload/audio`,
    },
    source: {
        root: sourceRoot,
        getSourceOfChat: `/${sourceRoot}/:chatId`,
    },
    discussion: {
        root: discussionRoot,
        chats: `${discussionRoot}/:discussionId/chats`,
        getDiscussion: `/${discussionRoot}/:userId`,
        create: `/${discussionRoot}`,
    },
    evaluation: {
        root: evaluationRoot,
        update: `/${evaluationRoot}/:evaluationId`,
    },
};
//# sourceMappingURL=routes.js.map