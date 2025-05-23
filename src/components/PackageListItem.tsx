import { Action, ActionPanel, Icon, List } from "@raycast/api";
import DocsList from "./DocsList";
import { Package } from "../types";

type PackageListItemProps = {
  pkg: Package;
  refreshAction: JSX.Element;
};

export default function PackageListItem({ pkg, refreshAction }: PackageListItemProps) {
  return (
    <List.Item
      key={pkg.name}
      title={pkg.name}
      subtitle={pkg.description}
      keywords={keywords(pkg.description)}
      actions={
        <ActionPanel>
          <Action.Push
            title="Show Package"
            icon={Icon.AppWindowSidebarLeft}
            target={<DocsList packageName={pkg.name} url={`https://hexdocs.pm/${pkg.name}/`} />}
          />
          <Action.OpenInBrowser title="Open in Browser" url={`https://hexdocs.pm/${pkg.name}/`} />
          <Action.CopyToClipboard
            title="Copy Link"
            shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
            content={`https://hexdocs.pm/${pkg.name}/`}
          />
          <ActionPanel.Section>{refreshAction}</ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

function keywords(description: string) {
  return description.split(" ").map((word) => word.toLowerCase());
}
