import { DiscussionEntity } from './discussion.entity';
import { CreateDiscussionProps } from './discussion.type';

describe('DiscussionEntity', () => {
  let validDiscussionData: CreateDiscussionProps;

  beforeEach(() => {
    validDiscussionData = {
      title: "travail des enfants en côte d'ivoire ",
      userId: '187329BShsqsj',
    };
  });

  test('should create an discussion with valid data', () => {
    const discussion = DiscussionEntity.create(validDiscussionData);
    expect(discussion).toBeInstanceOf(DiscussionEntity);
  });
});
describe('DiscussionEntity', () => {
  let validDiscussionData: CreateDiscussionProps;

  beforeEach(() => {
    validDiscussionData = {
      title: '',
      userId: '187329BShsqsj',
    };
  });

  test('throw error when discussion title is empty', () => {
    expect(() => DiscussionEntity.create(validDiscussionData)).toThrow(
      'title is invalid',
    );
  });
});
