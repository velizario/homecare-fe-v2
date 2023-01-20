import Badge from "../../utilityComponents/Badge";
import Tooltip from "./Tooltip";

export default function PortfolioTags() {
  return (
    <div className="">
      <h2 className="text-xl font-bold tracking-tight text-gray-900">
        Портфолио
      </h2>
      <div className="flex gap-3 flex-wrap mt-3">
        <Tooltip tooltipText="Почистване.">
          <Badge styles="bg-indigo-100 text-indigo-800">Основно</Badge>
        </Tooltip>
        <Tooltip tooltipText="Почистване на под, прах, баня и тоалетна, кухня и т.н.">
          <Badge styles="bg-indigo-100 text-indigo-800">Мека мебел</Badge>
        </Tooltip>
        <Tooltip tooltipText="Почистване на под, прах, баня и тоалетна, кухня и т.н.">
          <Badge styles="text-gray-400 font-light">Прозорци</Badge>
        </Tooltip>
        <Tooltip tooltipText="Почистване на под, прах, баня и тоалетна, кухня и т.н.">
          <Badge styles="text-gray-400 font-light">Собствени материали</Badge>
        </Tooltip>
        <Tooltip tooltipText="Почистване на под, прах, баня и тоалетна, кухня и т.н.">
          <Badge styles="bg-indigo-100 text-indigo-800">Абонамент</Badge>
        </Tooltip>
        <Tooltip tooltipText="Почистване на под, прах, баня и тоалетна, кухня и т.н.">
          <Badge styles="bg-indigo-100 text-indigo-800">Еднократно</Badge>
        </Tooltip>
      </div>
    </div>
  );
}