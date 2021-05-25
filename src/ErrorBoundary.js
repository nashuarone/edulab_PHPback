import React from "react";
import "./App.css";
import fox from "./assets/images/crazy_fox_smoke.gif";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <div className="errorBlock">
          <div>
            <h1>Что-то пошло не так, обновите страницу</h1>
          </div>
          <div>
            <img src={fox} alt="Плохо дело..." />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
