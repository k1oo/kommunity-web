import React, { useState } from 'react';
import styled from 'styled-components';
import { Board, BoardImage, BOARD_LIKE, BoardLike } from '../../../lib/graphql/query/Board';
import { MdThumbUp, MdComment, MdMoreHoriz } from 'react-icons/md';
import { Comment, POST_COMMENT } from '../../../lib/graphql/query/Comment';
import { useMutation } from 'react-apollo';

const PostItemBlock = styled.div`
  @media only screen and (min-width: 1920px) {
    width: 100%;

    border: 0.1em solid #505afc;
    border-radius: 16px;

    display: flex;
    flex-direction: column;

    margin-bottom: 5em;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

const PostInfo = styled.div`
  @media only screen and (min-width: 1920px) {
    height: 3em;
    border-bottom: 0.1em solid #505afc;

    display: flex;
    flex-direction: row;
  }
`;

const UserImage = styled.img`
  @media only screen and (min-width: 1920px) {
    margin: 0.5em 0.5em 0.5em 1.2em;

    width: 2em;
    height: 2em;

    border: 0.05em solid #505afc;
    border-radius: 30px;

    display: flex;
  }
`;

const UserName = styled.a`
  @media only screen and (min-width: 1920px) {
    width: 35em;

    margin: 0.9em 0em;
    font-size: 1em;
  }
`;

const LikeCountBlock = styled.div`
  color: #505afc;

  margin-top: 0.9em;

  display: flex;
  flex-direction: row;
  align-content: center;
`;

const LikeCount = styled.div`
  color: black;

  margin-top: 0.07em;
  margin-left: 0.1em;
  font-size: 0.9em;
`;

const PostContentBlock = styled.div`
  @media only screen and (min-width: 1920px) {
    display: flex;
    flex-direction: column;
  }
`;

const PostContent = styled.div`
  @media only screen and (min-width: 1920px) {
    padding: 2em 2.5em;
  }
`;

const PostImage = styled.img`
  @media only screen and (min-width: 1920px) {
    margin: 0 auto;
    margin-bottom: 3em;

    width: 38em;
    height: 38em;
  }
`;

const PostBottomBlock = styled.div`
  @media only screen and (min-width: 1920px) {
    display: flex;
    flex-direction: row;

    border-top: 0.1em solid #505afc;
    border-bottom: 0.1em solid #505afc;

    height: 3em;
  }
`;

const PostLikeBlock = styled.div`
  @media only screen and (min-width: 1920px) {
    width: 50%;

    display: flex;

    justify-content: center;

    border-right: 0.05em solid #505afc;

    svg {
      margin-top: 0.85em;
    }
  }
`;

const PostLike = styled.a`
  @media only screen and (min-width: 1920px) {
    margin-top: 1.2em;
    margin-left: 0.3em;
    font-size: 0.8em;

    cursor: pointer;
  }
`;

const PostCommentBlock = styled.div`
  @media only screen and (min-width: 1920px) {
    width: 50%;

    display: flex;

    justify-content: center;

    border-left: 0.05em solid #505afc;

    svg {
      margin-top: 0.85em;
    }
  }
`;

const PostComment = styled.a`
  @media only screen and (min-width: 1920px) {
    margin-top: 1.2em;
    margin-left: 0.3em;
    font-size: 0.8em;
  }
`;

const CommentBox = styled.div`
  @media only screen and (min-width: 1920px) {
    padding: 3em 2em;

    display: flex;
    flex-direction: column;
  }
`;

const CommentWriteBlock = styled.form`
  @media only screen and (min-width: 1920px) {
    width: 34.8em;
    padding: 0 2em;
    margin-bottom: 2.7em;

    display: flex;
    flex-direction: column;

    align-content: center;
  }
`;

const CommentInput = styled.textarea`
  @media only screen and (min-width: 1920px) {
    padding: 0.5em 1em;

    width: 100%;
    height: 5em;

    border: 0.15em solid #505afc;

    resize: none;

    box-sizing: border-box;
  }
`;

const CommentWriteButton = styled.button`
  @media only screen and (min-width: 1920px) {
    width: 100%;
    height: 3em;

    color: white;

    border: 0.15em solid #505afc;

    background: #505afc;

    cursor: pointer;
  }
`;

const CommentBlock = styled.div`
  @media only screen and (min-width: 1920px) {
    width: 100%;

    display: flex;
    flex-direction: row;

    margin: 0.5em 0;
  }
`;

const CommentUserImage = styled.img`
  @media only screen and (min-width: 1920px) {
    width: 2em;
    height: 2em;

    background: #ddd;

    border: 0.07em solid #505afc;
    border-radius: 20px;
  }
`;

const CommentContentBlock = styled.div`
  @media only screen and (min-width: 1920px) {
    padding: 0.5em 1em;
    margin-left: 1em;

    width: 33em;

    background: #efefef;

    border-radius: 16px;

    font-size: 1em;

    word-break: break-all;

    display: flex;
    flex-direction: column;
  }
`;

const CommentUserName = styled.a`
  @media only screen and (min-width: 1920px) {
    font-size: 0.9em;

    color: #505afc;
  }
`;

const CommentContent = styled.div`
  @media only screen and (min-width: 1920px) {
    font-size: 1em;

    color: black;
  }
`;

const PostItem = ({ board, token }: { board: Board; token: string | null }) => {
  const [comment, setComment] = useState('');

  const [postComment] = useMutation(POST_COMMENT);
  const [boardLike] = useMutation(BOARD_LIKE);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await postComment({
      variables: {
        token,
        board_pk: board.pk,
        content: comment,
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.networkError.result.errors[0].message);
      });
  };

  const likeBoard = async (e: React.MouseEvent) => {
    e.preventDefault();

    await boardLike({
      variables: {
        token,
        board_pk: board.pk,
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.networkError.result.errors[0].message);
      });
  };

  return (
    <PostItemBlock>
      <PostInfo>
        <UserImage
          src={
            board.user.image
              ? board.user.image
              : 'https://s3-kommunity.s3.ap-northeast-2.amazonaws.com/board-image/1586617608119noProfile.jpg'
          }
        />
        <UserName>{board.user.name}</UserName>
        <LikeCountBlock>
          <MdThumbUp />
          <LikeCount>{board.boardLike.length}</LikeCount>
        </LikeCountBlock>
      </PostInfo>
      <PostContentBlock>
        <PostContent>
          {board.content.split('\n').map((text) => (
            <div>
              {text}
              <br />
            </div>
          ))}
        </PostContent>
        {board.boardImage.map((image: BoardImage) => (
          <PostImage
            src={'https://s3-kommunity.s3.ap-northeast-2.amazonaws.com/board-image/' + image.image}
          />
        ))}
      </PostContentBlock>
      <PostBottomBlock>
        <PostLikeBlock>
          <MdThumbUp style={board.isLike ? { color: '#505afc' } : {}} />
          <PostLike style={board.isLike ? { color: '#505afc' } : {}} onClick={likeBoard}>
            좋아요
          </PostLike>
        </PostLikeBlock>
        <PostCommentBlock>
          <MdComment />
          <PostComment>댓글</PostComment>
        </PostCommentBlock>
      </PostBottomBlock>
      <CommentBox>
        <CommentWriteBlock onSubmit={onSubmit}>
          <CommentInput
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <CommentWriteButton type="submit">작성하기</CommentWriteButton>
        </CommentWriteBlock>
        {board.comment.length ? (
          board.comment.map((comment: Comment) => (
            <CommentBlock key={comment.user_pk}>
              <CommentUserImage
                src={
                  comment.user.image
                    ? 'https://s3-kommunity.s3.ap-northeast-2.amazonaws.com/board-image/' +
                      comment.user.image
                    : 'https://s3-kommunity.s3.ap-northeast-2.amazonaws.com/board-image/1586617608119noProfile.jpg'
                }
              />
              <CommentContentBlock>
                <CommentUserName>{comment.user.name}</CommentUserName>
                <CommentContent>
                  {comment.content.split('\n').map((text) => (
                    <div>
                      {text}
                      <br />
                    </div>
                  ))}
                </CommentContent>
              </CommentContentBlock>
            </CommentBlock>
          ))
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </CommentBox>
    </PostItemBlock>
  );
};

export default PostItem;
