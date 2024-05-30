import { FormBasket } from "@/components/specific/basket/FormBasket";
import { render } from "@testing-library/react";

const renderComponent = ({ children }: { children: React.ReactNode }) => {
  return render(children);
};

describe("Components -> Basket", () => {
  it("-> should render FormBasket", () => {
    renderComponent({
      children: <FormBasket />,
    });
  });
});
