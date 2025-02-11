import * as authActions from "../authReducer/actions";
import * as courseActions from "../courseReducer/actions";
import * as topicActions from "../topicReducer/actions";
import * as testActions from "../testReducer/actions";

const actions = {
    ...authActions,
    ...courseActions,
    ...topicActions,
    ...testActions
};

export default actions;
