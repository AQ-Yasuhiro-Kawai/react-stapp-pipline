import { Search } from "lucide-react";

type SummaryItem = {
  label: string;
  value: string | React.ReactNode;
  onValueClick?: (card: Card) => void;
};

export type Card = {
  id: string;
  onCardClick: (card: Card) => void;
  items: SummaryItem[];
  className?: string;
};

export type TaskSummaryCardProps = {
  card?: Card;
  className?: string;
};

const TaskSummaryValue = ({
  item,
  card,
}: {
  item: SummaryItem;
  card: Card;
}) => {
  if (item.onValueClick) {
    return (
      <button
        className="text-left cursor-pointer"
        onClick={() => item.onValueClick?.(card)}
        type="button"
      >
        <span className="underline text-main-blue decoration-main-blue">
          {item.value}
        </span>
      </button>
    );
  }

  if (typeof item.value === "string") {
    return <span>{item.value}</span>;
  }

  return <div>{item.value}</div>;
};

export const TaskSummaryItem = ({
  item,
  card,
}: {
  item: SummaryItem;
  card: Card;
}) => {
  return (
    <div className="flex min-h-8 justify-between items-center self-stretch">
      <div className="flex items-center flex-1 self-stretch text-sub-text">
        <span className="text-base">{item.label}</span>
      </div>
      <div className="flex items-center flex-1">
        <TaskSummaryValue card={card} item={item} />
      </div>
    </div>
  );
};

const TaskSummaryEmptyState = () => (
  <div className="flex w-full justify-center items-center">該当なし</div>
);

const TaskSummaryActionButton = ({ card }: { card: Card }) => (
  <div className="flex justify-end items-center self-stretch">
    <button
      className="flex h-9 py-2 px-4 justify-center items-center rounded-md border border-main-border bg-thin-bg hover:cursor-pointer hover:bg-sub-bg"
      onClick={() => card.onCardClick(card)}
      type="button"
    >
      <Search className="w-4.5 h-4.5 mr-2" />
      <span className="text-base font-bold">内容を確認</span>
    </button>
  </div>
);

export const TaskSummaryCardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-start gap-4 self-stretch">
    <div className="flex p-2 flex-col items-start self-stretch rounded-lg outline-1 outline-main-border outline-offset-[-1px]">
      {children}
    </div>
  </div>
);

export const TaskSummaryCard = ({ card }: TaskSummaryCardProps) => {
  return (
    <TaskSummaryCardContainer>
      {!card && <TaskSummaryEmptyState />}

      {card?.items.map((item) => (
        <TaskSummaryItem card={card} item={item} key={item.label} />
      ))}

      {card && <TaskSummaryActionButton card={card} />}
    </TaskSummaryCardContainer>
  );
};
