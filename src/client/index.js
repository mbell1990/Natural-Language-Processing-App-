import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";

import "./styles/base.scss";
import "./styles/form.scss";

//Load weather icons
function importAll(r) {
  return r.keys().map(r);
}
importAll(require.context("./media/learning", false, /\.(svg)$/));

export { handleSubmit, checkForName };
