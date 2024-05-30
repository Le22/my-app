import Footer from "@/components/generic/Footer";
import { render } from "@testing-library/react";

const renderComponent = ({ children }: { children: React.ReactNode }) => {
  return render(children);
};

describe("Components -> Footer", () => {
  it("-> should render Footer", () => {
    renderComponent({
      children: <Footer />,
    });
  });
});
