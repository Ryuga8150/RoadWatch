// import { ReactComponent as TimelineIcon } from "public/icons/timeline.svg";
type Icon = {
  width?: number;
  height?: number;
  color?: string;
};

export const DashboardIcon = ({
  width = 24,
  height = 24,
  color = "#919298",
}: Icon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="view_agenda_24px">
        <path
          id="icon/action/view_agenda_24px"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.5 3H3.5C2.95 3 2.5 3.45 2.5 4V10C2.5 10.55 2.95 11 3.5 11H20.5C21.05 11 21.5 10.55 21.5 10V4C21.5 3.45 21.05 3 20.5 3ZM19.5 9V5H4.5V9H19.5ZM19.5 19V15H4.5V19H19.5ZM3.5 13H20.5C21.05 13 21.5 13.45 21.5 14V20C21.5 20.55 21.05 21 20.5 21H3.5C2.95 21 2.5 20.55 2.5 20V14C2.5 13.45 2.95 13 3.5 13Z"
          // fill="#919298"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const SensorStatusIcon = ({
  width = 24,
  height = 24,
  color = "#919298",
}: Icon) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 30 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="timeline_24px">
        <path
          id="icon/action/timeline_24px"
          d="M28.75 8.66667C28.75 9.85833 27.625 10.8333 26.25 10.8333C26.025 10.8333 25.8125 10.8117 25.6125 10.7575L21.1625 14.6033C21.225 14.7767 21.25 14.9717 21.25 15.1667C21.25 16.3583 20.125 17.3333 18.75 17.3333C17.375 17.3333 16.25 16.3583 16.25 15.1667C16.25 14.9717 16.275 14.7767 16.3375 14.6033L13.15 11.8408C12.95 11.895 12.725 11.9167 12.5 11.9167C12.275 11.9167 12.05 11.895 11.85 11.8408L6.1625 16.7808C6.225 16.9542 6.25 17.1383 6.25 17.3333C6.25 18.525 5.125 19.5 3.75 19.5C2.375 19.5 1.25 18.525 1.25 17.3333C1.25 16.1417 2.375 15.1667 3.75 15.1667C3.975 15.1667 4.1875 15.1883 4.3875 15.2425L10.0875 10.3133C10.025 10.14 10 9.945 10 9.75C10 8.55833 11.125 7.58333 12.5 7.58333C13.875 7.58333 15 8.55833 15 9.75C15 9.945 14.975 10.14 14.9125 10.3133L18.1 13.0758C18.3 13.0217 18.525 13 18.75 13C18.975 13 19.2 13.0217 19.4 13.0758L23.8375 9.21917C23.775 9.04583 23.75 8.86167 23.75 8.66667C23.75 7.475 24.875 6.5 26.25 6.5C27.625 6.5 28.75 7.475 28.75 8.66667Z"
          fill={color}
          fillOpacity="0.54"
        />
      </g>
    </svg>
  );
};
export const DataIcon = ({
  width = 24,
  height = 24,
  color = "#919298",
}: Icon) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="watch_later_24px">
        <path
          id="icon/action/watch_later_24px"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 2.33333C7.58331 2.33333 2.33331 7.58333 2.33331 14C2.33331 20.4167 7.58331 25.6667 14 25.6667C20.4166 25.6667 25.6666 20.4167 25.6666 14C25.6666 7.58333 20.4166 2.33333 14 2.33333ZM14 23.3333C8.85498 23.3333 4.66665 19.145 4.66665 14C4.66665 8.855 8.85498 4.66666 14 4.66666C19.145 4.66666 23.3333 8.855 23.3333 14C23.3333 19.145 19.145 23.3333 14 23.3333ZM12.8333 8.16666H14.5833V14.2333L19.8333 17.3833L18.9 18.9L12.8333 15.1667V8.16666Z"
          fill={color}
          fillOpacity="0.54"
        />
      </g>
    </svg>
  );
};

export const ComplaintIcon = ({
  width = 24,
  height = 24,
  color = "#919298",
}: Icon) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="alert/warning_24px">
        <path
          id="icon/outlined/alert/warning_24px"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.9166 23.2917L13 2.70834L1.08331 23.2917H24.9166ZM11.9166 20.0417V17.875H14.0833V20.0417H11.9166ZM11.9166 15.7083H14.0833V11.375H11.9166V15.7083Z"
          fill={color}
          fillOpacity="0.54"
        />
      </g>
    </svg>
  );
};

export const AlertIcon = ({
  width = 24,
  height = 24,
  color = "#919298",
}: Icon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 23.25V14.9167C24 9.8 21.2834 5.51667 16.5 4.38333V3.25C16.5 1.86667 15.3834 0.75 14 0.75C12.6167 0.75 11.5 1.86667 11.5 3.25V4.38333C6.73335 5.51667 4.00002 9.78333 4.00002 14.9167V23.25L0.666687 26.5833V28.25H27.3334V26.5833L24 23.25ZM14 33.25C15.8334 33.25 17.3334 31.75 17.3334 29.9167H10.6667C10.6667 31.75 12.1667 33.25 14 33.25ZM7.33335 24.9167H20.6667V14.9167C20.6667 10.7833 18.15 7.41667 14 7.41667C9.85002 7.41667 7.33335 10.7833 7.33335 14.9167V24.9167Z"
        fill={color}
        fillOpacity="0.54"
      />
    </svg>
  );
};
