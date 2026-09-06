import { useEffect, useState } from "react";
import useSettings from "@/app/hooks/useSettings";
import TextProperty from "../../Properties/TextProperty";
import { ModelProfile } from "@/app/types/ModelProfile"
import { commands } from "@/bindings";


interface ApiKeyInputProps {
  currentProfile: ModelProfile | null,
}

const ApiKeyInput = ({ currentProfile }: ApiKeyInputProps): React.ReactNode => {
  const { writeApiKey } = useSettings();
  const [isKeyStored, setIsKeyStored] = useState(false);

  useEffect(() => {
    if (!currentProfile) return;
    commands.checkProfileApiKey(currentProfile.id)
      .then(result => setIsKeyStored(result.is_saved));
  }, [currentProfile])

  const handleChange = (value: string) => {
    if (!currentProfile) return;
    writeApiKey(currentProfile.id, value);
  }

  let placeholderValue = "";
  if (isKeyStored)
    placeholderValue = "✓ API key saved";
  else
    placeholderValue = "Pleace, enter API key";

  return (
    <>
      <TextProperty
        className={isKeyStored ? "" : "border-destructive"}
        placeholder={placeholderValue}
        id='profile-service-api-key-input' label='API key'
        type='password'
        onChange={handleChange}
      />
    </>
  )
}

export default ApiKeyInput;
