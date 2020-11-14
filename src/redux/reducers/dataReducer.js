import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_CONTESTS,
  SET_CONTEST,
  UNSET_CONTEST,
  SET_CANDIDATES,
  SET_CANDIDATE,
  UNSET_CANDIDATE,
  SET_CANDIDATE_PICTURE,
  SET_CONTEST_COMMENT,
  SET_CONTEST_CANDIDATE,
  UNSET_CONTEST_CANDIDATE,
  SET_CANDIDATE_VOTE,
  UNSET_CANDIDATE_VOTE,
  UPDATE_CANDIDATE_VOTE,
  LOAD_REDUX_DATA_FIELDS,
  SET_USER_PICTURE_COMMENTS,
  SET_USER_PICTURE_CONTESTS,
  UPDATE_USER_DETAILS_CONTESTS,
  UPDATE_USER_DETAILS_COMMENTS,
} from "../types";

const initialState = {
  summary: {},
  summaryLog: [],
  contests: [],
  candidates: [],
  contestCandidates: [],
  votes: [],
  comments: [],
  loading: false,
};

export default function (state = initialState, action) {
  //console.log(action);
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };
    case LOAD_REDUX_DATA_FIELDS:
      //console.log(action.payload);
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case SET_USER_PICTURE_CONTESTS: {
      state.contests.map((contest) => {
        if (contest.userId === action.payload.userId) {
          return (contest.picture = action.payload.profileImage);
        } else {
          return contest;
        }
      });

      return {
        ...state,
        loading: false,
      };
    }

    case SET_USER_PICTURE_COMMENTS: {
      state.comments.map((comment) => {
        if (comment.userId === action.payload.userId) {
          return (comment.picture = action.payload.profileImage);
        } else {
          return comment;
        }
      });

      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_USER_DETAILS_CONTESTS: {
      state.contests.map((contest) => {
        if (contest.userId === action.payload.userId) {
          return (contest.name = action.payload.name);
        } else {
          return contest;
        }
      });
      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_USER_DETAILS_COMMENTS: {
      state.comments.map((comment) => {
        if (comment.userId === action.payload.userId) {
          return (comment.name = action.payload.name);
        } else {
          return comment;
        }
      });
      return {
        ...state,
        loading: false,
      };
    }

    case SET_CANDIDATES:
      return {
        ...state,
        candidates: action.payload,
        loading: false,
      };
    case SET_CANDIDATE:
      return {
        ...state,
        loading: false,
        candidates: [action.payload, ...state.candidates],
      };
    case UNSET_CANDIDATE: {
      if (Object.keys(state.contests).length > 0) {
        const index = state.contests.findIndex(
          (contestIndex) => contestIndex.candidates
        );

        let newArray = [...state.contests];

        newArray[index].candidates = [
          action.payload.candidateId,
          ...newArray[index].candidates,
        ];

        return {
          ...state,
          candidates: [
            ...state.candidates.filter(
              (candidate) => candidate.candidateId !== action.payload
            ),
          ],
          contests: newArray,
          loading: false,
        };
      } else {
        return {
          ...state,
          candidates: [
            ...state.candidates.filter(
              (candidate) => candidate.candidateId !== action.payload
            ),
          ],
          loading: false,
        };
      }
    }

    case SET_CANDIDATE_PICTURE: {
      if (Object.keys(state.contestCandidates).length > 0) {
        const index = state.candidates.findIndex(
          (candidateIndex) =>
            candidateIndex.candidateId === action.payload.candidateId
        );

        let newArray = [...state.candidates];

        newArray[index].picture = action.payload.imageUrl;

        state.contestCandidates.map((conCand) => {
          if (conCand.candidateId === action.payload.candidateId) {
            return (conCand.picture = action.payload.imageUrl);
          } else {
            return conCand;
          }
        });

        return {
          ...state,
          loading: false,
          candidates: newArray,
        };
      } else {
        const index = state.candidates.findIndex(
          (candidateIndex) =>
            candidateIndex.candidateId === action.payload.candidateId
        );

        let newArray = [...state.candidates];

        newArray[index].picture = action.payload.imageUrl;

        return {
          ...state,
          loading: false,
          candidates: newArray,
        };
      }
    }
    case SET_CONTESTS:
      return {
        ...state,
        contests: action.payload,
        loading: false,
      };
    case SET_CONTEST:
      return {
        ...state,
        contests: [action.payload, ...state.contests],
        loading: false,
      };
    case UNSET_CONTEST: {
      //first get candidates list in contest and decrement their candidateAddedToContests value
      const contestIndex = state.contests.findIndex(
        (contest) => contest.contestId === action.payload
      );
      let conCandidates = state.contests[contestIndex].candidates;
      if (Object.keys(conCandidates).length > 0) {
        let newCandidates = [...state.candidates];

        newCandidates.map((newCan) => {
          if (newCan.candidateId.includes(conCandidates)) {
            return newCan.candidateAddedToContests--;
          } else {
            return newCan;
          }
        });

        return {
          ...state,
          loading: false,
          contests: [
            ...state.contests.filter(
              (contest) => contest.contestId !== action.payload
            ),
          ],
          contestCandidates: [
            ...state.contestCandidates.filter(
              (concan) => concan.contestId !== action.payload
            ),
          ],
          candidates: newCandidates,
        };
      } else {
        return {
          ...state,
          loading: false,
          contests: [
            ...state.contests.filter(
              (contest) => contest.contestId !== action.payload
            ),
          ],
          contestCandidates: [
            ...state.contestCandidates.filter(
              (concan) => concan.contestId !== action.payload
            ),
          ],
        };
      }
    }

    case SET_CONTEST_COMMENT: {
      const index = state.contests.findIndex(
        (contestIndex) => contestIndex.contestId === action.payload.contestId
      );
      state.contests[index].commentCountTotal++;

      return {
        ...state,
        loading: false,
        comments: [action.payload, ...state.comments],
      };
    }
    case SET_CONTEST_CANDIDATE: {
      const index = state.contests.findIndex(
        (contestIndex) => contestIndex.contestId === action.payload.contestId
      );

      const candidateIndex = state.candidates.findIndex(
        (candidate) => candidate.candidateId === action.payload.candidateId
      );

      state.candidates[candidateIndex].candidateAddedToContests++;

      let newArray = [...state.contests];

      newArray[index].candidates = [
        action.payload.candidateId,
        ...newArray[index].candidates,
      ];

      /* let newCanArray = [...state.candidates];
      newCanArray[candidateIndex].candidateAddedToContests++; */

      return {
        ...state,
        contestCandidates: [action.payload, ...state.contestCandidates],
        contests: newArray,
        loadin: false,
      };
    }
    case UNSET_CONTEST_CANDIDATE: {
      // remove candidateId from contests candidates
      const contestIndex = state.contests.findIndex(
        (contest) => contest.contestId === action.payload.contestId
      );

      let newArray = [...state.contests];

      newArray[contestIndex].candidates = newArray[
        contestIndex
      ].candidates.filter(
        (candidate) => candidate !== action.payload.candidateId
      );

      const candidateIndex = state.candidates.findIndex(
        (candidate) => candidate.candidateId === action.payload.candidateId
      );

      let newCanArray = [...state.candidates];
      newCanArray[candidateIndex].candidateAddedToContests--;

      let updatedContestCandidates = [...state.contestCandidates];

      updatedContestCandidates.map((conCad, index) => {
        if (
          conCad.contestId === action.payload.contestId &&
          conCad.candidateId === action.payload.candidateId
        ) {
          return updatedContestCandidates.splice(index, 1);
        } else {
          return conCad;
        }
      });

      console.log(updatedContestCandidates);

      return {
        ...state,
        contests: newArray,
        candidates: newCanArray,
        contestCandidates: updatedContestCandidates,
        loading: false,
      };
    }
    case SET_CANDIDATE_VOTE: {
      // increment voteCount in candidates
      const candidateIndex = state.candidates.findIndex(
        (candidate) => candidate.candidateId === action.payload.candidateId
      );

      let updatedCandidates = [...state.candidates];
      updatedCandidates[candidateIndex].voteCount++;

      // Here voteCount for candidates finished

      // now update vote count values in contests
      const contestIndex = state.contests.findIndex(
        (contest) => contest.contestId === action.payload.contestId
      );

      let updatedContests = [...state.contests];
      updatedContests[contestIndex].voteCountTotal++;

      // contests voteCountTotal increment finished Here

      // now update voteCount value in contestCandidates
      const contestCandidatesIndex = state.contestCandidates.findIndex(
        (contestCandidate) =>
          contestCandidate.contestId === action.payload.contestId &&
          contestCandidate.candidateId === action.payload.candidateId
      );

      let updatedContestCandidates = [...state.contestCandidates];
      updatedContestCandidates[contestCandidatesIndex].voteCount++;

      //state.contestCandidates[contestCandidatesIndex].voteCount++;

      return {
        ...state,
        votes: [action.payload, ...state.votes],
        candidates: updatedCandidates,
        contests: updatedContests,
        contestCandidates: updatedContestCandidates,
        loading: false,
      };
    }

    case UNSET_CANDIDATE_VOTE: {
      // increment voteCount in candidates
      const candidateIndex = state.candidates.findIndex(
        (candidate) => candidate.candidateId === action.payload.candidateId
      );

      let updatedCandidates = [...state.candidates];
      updatedCandidates[candidateIndex].voteCount--;

      // Here voteCount for candidates finished

      // now update vote count values in contests
      const contestIndex = state.contests.findIndex(
        (contest) => contest.contestId === action.payload.contestId
      );

      let updatedContests = [...state.contests];
      updatedContests[contestIndex].voteCountTotal--;

      // contests voteCountTotal increment finished Here

      // now update voteCount value in contestCandidates
      const contestCandidatesIndex = state.contestCandidates.findIndex(
        (contestCandidate) =>
          contestCandidate.contestId === action.payload.contestId &&
          contestCandidate.candidateId === action.payload.candidateId
      );

      let updatedContestCandidates = [...state.contestCandidates];
      updatedContestCandidates[contestCandidatesIndex].voteCount--;

      // Now remove Vote Record from votes Array in state

      let updatedVotes = [
        ...state.votes.filter(
          (remainingVotes) =>
            remainingVotes.contestId !== action.payload.contestId &&
            remainingVotes.candidateId !== action.payload.candidateId &&
            remainingVotes.userId !== action.payload.userId
        ),
      ];

      return {
        ...state,
        votes: updatedVotes,
        candidates: updatedCandidates,
        contests: updatedContests,
        contestCandidates: updatedContestCandidates,
        loading: false,
      };
    }

    case UPDATE_CANDIDATE_VOTE: {
      // increment voteCount in candidates for new candidate
      const candidateIndex = state.candidates.findIndex(
        (candidate) => candidate.candidateId === action.payload.candidateId
      );

      let updatedCandidates = [...state.candidates];
      updatedCandidates[candidateIndex].voteCount++;

      // decrement voteCount for Old Candidate in candidates
      const oldCandidateIndex = state.candidates.findIndex(
        (oldCandidate) =>
          oldCandidate.candidateId === action.payload.oldCandidateId
      );
      updatedCandidates[oldCandidateIndex].voteCount--;

      // Here voteCount for candidates finished

      // now update vote count values in contests
      // No changes in contests voteCount
      /* const contestIndex = state.contests.findIndex(
        (contest) => contest.contestId === action.payload.contestId
      );

      let updatedContests = [...state.contests];
      updatedContests[contestIndex].voteCountTotal--; */

      // contests voteCountTotal increment finished Here

      // now update voteCount value in contestCandidates for new Candidate
      const contestCandidatesIndex = state.contestCandidates.findIndex(
        (contestCandidate) =>
          contestCandidate.contestId === action.payload.contestId &&
          contestCandidate.candidateId === action.payload.candidateId
      );

      let updatedContestCandidates = [...state.contestCandidates];
      updatedContestCandidates[contestCandidatesIndex].voteCount++;

      // Now decrement old candidate voteCount in contestCandidates
      const oldContestCandidatesIndex = state.contestCandidates.findIndex(
        (oldContestCandidate) =>
          oldContestCandidate.contestId === action.payload.contestId &&
          oldContestCandidate.candidateId === action.payload.oldCandidateId
      );

      updatedContestCandidates[oldContestCandidatesIndex].voteCount--;
      // Now remove Vote Record from votes Array in state

      let updatedVotes = [
        ...state.votes.filter(
          (remainingVotes) =>
            remainingVotes.contestId !== action.payload.contestId &&
            remainingVotes.candidateId !== action.payload.oldCandidateId &&
            remainingVotes.userId !== action.payload.userId
        ),
      ];

      updatedVotes = [
        {
          voteId: action.payload.voteId,
          contestId: action.payload.contestId,
          candidateId: action.payload.candidateId,
          oldCandidateId: action.payload.oldCandidateId,
          userId: action.payload.userId,
          createdAt: action.payload.createdAt,
        },
        ...updatedVotes,
      ];

      return {
        ...state,
        votes: updatedVotes,
        candidates: updatedCandidates,
        contestCandidates: updatedContestCandidates,
        loading: false,
      };
    }

    default:
      return state;
  }
}
