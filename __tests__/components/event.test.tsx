import CardEvent from "@/components/specific/event/CardEvent";
import { render } from "@testing-library/react";

const renderComponent = ({ children }: { children: React.ReactNode }) => {
  return render(children);
};

describe("Components -> Event", () => {
  it("-> should render CardEvent", () => {
    renderComponent({
      children: (
        <CardEvent
          title="Football"
          url="https://tickets.paris2024.org/events/jeux-olympiques-225/football-2252"
          image="/assets/football.png"
        />
      ),
    });
  });
});
