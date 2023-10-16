import { useEffect, useState } from "react";
import { IVersion } from "../models/IVersion";
import { IPersonaProps } from "@fluentui/react";

export default function useFileContributor(contributor: IPersonaProps, versions?: IVersion[]): IPersonaProps[] {
  const [contributors, setContributors] = useState<IPersonaProps[]>(undefined);

  async function fetchContributors(): Promise<void> {
    let filteredContributors = versions;
    if (contributor) filteredContributors = filteredContributors
      .filter(v => v.Author.LookupValue.indexOf(contributor.text) !== -1 || v.Author.Email.indexOf(contributor.secondaryText) !== -1);

    // Make distinct values
    const contributors = new Map<string, IPersonaProps>();
    filteredContributors.forEach(c => {
      contributors.set(c.Author.Email, { text: c.Author.LookupValue, secondaryText: c.Author.Email });
    });

    // projection of Map to array due to missing spread operator function in current lib version
    const persona: IPersonaProps[] = [];
    contributors.forEach(c => persona.push(c));
    setContributors(persona);
  }

  useEffect(() => {
    fetchContributors();
  }, []);

  return contributors;
}