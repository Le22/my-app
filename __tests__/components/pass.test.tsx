import CardPass from "@/components/specific/pass/CardPass";
import { FormPass } from "@/components/specific/pass/FormPass";
import { Dialog } from "@/components/ui/dialog";
import { render } from "@testing-library/react";

const renderComponent = ({ children }: { children: React.ReactNode }) => {
  return render(children);
};

describe("Components -> Pass", () => {
  it("-> should render CardPass", () => {
    renderComponent({
      children: <CardPass id="1" title="Pass" />,
    });
  });

  it("-> should render FormPass", () => {
    renderComponent({
      children: (
        <Dialog>
          <FormPass
            id="1"
            title="Pass"
            actionText="Ajouter"
            onSubmit={() => {}}
          />
        </Dialog>
      ),
    });
  });
});
