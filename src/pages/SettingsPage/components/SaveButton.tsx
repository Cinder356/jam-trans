import useSettings from "@/app/hooks/useSettings";
import { Button } from "@/components/ui/button";

const SaveButton = (): React.ReactNode => {
  const { isSaved, saveSettings } = useSettings();

  return (
    <Button className="fixed bottom-2 right-2 font-bold rounded-lg" variant="outline" size="sm"
      disabled={isSaved} onClick={saveSettings}>
      Save
    </Button>
  )
}

export default SaveButton;
