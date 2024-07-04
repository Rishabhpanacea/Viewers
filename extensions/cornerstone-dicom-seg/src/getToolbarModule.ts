export function getToolbarModule({ servicesManager }: withAppTypes) {
  const { segmentationService, toolbarService, toolGroupService } = servicesManager.services;
  return [
    {
      name: 'evaluate.cornerstone.segmentation',
      evaluate: ({ viewportId, button, toolNames, disabledText }) => {
        // Todo: we need to pass in the button section Id since we are kind of
        // forcing the button to have black background since initially
        // it is designed for the toolbox not the toolbar on top
        // we should then branch the buttonSectionId to have different styles
        console.log("Checking for getSegmentation");
        console.log("viewportId");
        console.log(viewportId);
        console.log("button");
        console.log(button);
        console.log("toolNames");
        console.log(toolNames);
        console.log("disabledText");
        console.log(disabledText);
        const segmentations = segmentationService.getSegmentations();
        console.log("segmentations");
        console.log(segmentations);

        if (!segmentations?.length) {
          return {
            disabled: true,
            className: '!text-common-bright !bg-black opacity-50',
            disabledText: disabledText ?? 'No segmentations available',
          };
        }

        const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
        console.log("toolGroup");
        console.log(toolGroup);

        if (!toolGroup) {
          return {
            disabled: true,
            className: '!text-common-bright ohif-disabled',
            disabledText: disabledText ?? 'Not available on the current viewport',
          };
        }

        const toolName = toolbarService.getToolNameForButton(button);
        console.log("toolName");
        console.log(toolName);

        if (!toolGroup.hasTool(toolName) && !toolNames) {
          return {
            disabled: true,
            className: '!text-common-bright ohif-disabled',
            disabledText: disabledText ?? 'Not available on the current viewport',
          };
        }

        const isPrimaryActive = toolNames
          ? toolNames.includes(toolGroup.getActivePrimaryMouseButtonTool())
          : toolGroup.getActivePrimaryMouseButtonTool() === toolName;

        console.log("isPrimaryActive");
        console.log(isPrimaryActive);


        return {
          disabled: false,
          className: isPrimaryActive
            ? '!text-black !bg-primary-light hover:bg-primary-light hover-text-black hover:cursor-pointer'
            : '!text-common-bright !bg-black hover:bg-primary-light hover:cursor-pointer hover:text-black',
          // Todo: isActive right now is used for nested buttons where the primary
          // button needs to be fully rounded (vs partial rounded) when active
          // otherwise it does not have any other use
          isActive: isPrimaryActive,
        };
      },
    },
  ];
}
