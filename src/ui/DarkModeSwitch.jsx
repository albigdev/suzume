import ButtonIcon from "./ButtonIcon";

import { BsSun, BsMoonStars } from "react-icons/bs";
import useDarkMode from "../features/darkmode/useDarkMode";

function DarkModeSwitch() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <BsSun /> : <BsMoonStars />}
    </ButtonIcon>
  );
}

export default DarkModeSwitch;
