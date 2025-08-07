/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const usersRoot = "users";
const chatRoot = "chats";
const sourceRoot = "source";
const discussionRoot = "discussions";
const evaluationRoot = "evaluation";
// Api Versions
const v1 = "v1";

export const routesV1 = {
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
