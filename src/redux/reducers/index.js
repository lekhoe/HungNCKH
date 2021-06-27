import { combineReducers } from "redux";
import reducerLogin from "../../containers/Login/reducer";
import reducerTeacher from "../../containers/Teachers/reducer";
import reducerStudent from "../../containers/ChooseTopic/reducer";
import reducerAssignReviewer from "../../containers/AssignReviewers/reducer";
import reducerEvaluationBoard from "../../containers/EvaluationBoards/reducer";
import reducerTopic from "../../containers/Topics/reducer";
import reducerTopicDetail from "../../containers/TopicDetail/reducer";
import reducerSemester from "../../containers/Semesters/reducer";
import reducerSubject from "../../containers/Subjects/reducer";
import reducerSubjectList from "../../containers/SubjectLists/reducer";
import reducerListTeacherSemester from "../../containers/ListTeacherSemesters/reducer";
import reducerStudentList from "../../containers/Student/reducer";
import reducerFolder from "../../containers/Folder/reducer";
import reducerFile from "../../containers/Files/reducer";


export const rootReducer = combineReducers({
    reducerLogin,
    reducerTeacher,
    reducerStudent,
    reducerAssignReviewer,
    reducerEvaluationBoard,
    reducerTopic,
    reducerSemester,
    reducerSubject,
    reducerSubjectList,
    reducerListTeacherSemester,
    reducerTopicDetail,
    reducerStudentList,
    reducerFolder,
    reducerFile,

  });