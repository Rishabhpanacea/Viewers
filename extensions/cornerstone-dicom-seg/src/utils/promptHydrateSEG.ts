import { ButtonEnums } from '@ohif/ui';

const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  HYDRATE_SEG: 5,
};

function promptHydrateSEG({
  servicesManager,
  segDisplaySet,
  viewportId,
  preHydrateCallbacks,
  hydrateSEGDisplaySet,
}: withAppTypes) {
  console.log("Inside promptHydrateSEG");
  const { uiViewportDialogService } = servicesManager.services;
  const extensionManager = servicesManager._extensionManager;
  const appConfig = extensionManager._appConfig;
  // console.log("segDisplaySet",segDisplaySet);
  // console.log("labelmapBufferArray",segDisplaySet['labelmapBufferArray']);
  // console.log("labelmapBufferArray0",segDisplaySet['labelmapBufferArray'][0]);
  // let counter = 0;
  // for(let i=0;i<786432;i++){
  //     segDisplaySet['labelmapBufferArray'][0][i]=1;
  // }

  return new Promise(async function (resolve, reject) {
    const promptResult = appConfig?.disableConfirmationPrompts
      ? RESPONSE.HYDRATE_SEG
      : await _askHydrate(uiViewportDialogService, viewportId);

    console.log("promptResult",promptResult);
    if (promptResult === RESPONSE.HYDRATE_SEG) {
      preHydrateCallbacks?.forEach(callback => {
        callback();
      });

      window.setTimeout(async () => {
        console.log("Inside window.setTimeout");
        // console.log("segDisplaySet",segDisplaySet);
        // console.log("labelmapBufferArray",segDisplaySet['labelmapBufferArray']);
        // console.log("labelmapBufferArray0",segDisplaySet['labelmapBufferArray'][0]);
        // let counter = 0;
        // for(let i=0;i<786432;i++){
        //   segDisplaySet['labelmapBufferArray'][0][i]=1;
        // }
        // console.log("counter",counter);
        console.log("viewportId",viewportId);
        const isHydrated = await hydrateSEGDisplaySet({
          segDisplaySet,
          viewportId,
        });
        console.log("isHydrated",isHydrated);

        resolve(isHydrated);
      }, 0);
    }
  });
}

function _askHydrate(uiViewportDialogService, viewportId) {
  console.log("Inside _askHydrate");
  return new Promise(function (resolve, reject) {
    const message = 'Do you want to open this Segmentation?';
    const actions = [
      {
        id: 'no-hydrate',
        type: ButtonEnums.type.secondary,
        text: 'No',
        value: RESPONSE.CANCEL,
      },
      {
        id: 'yes-hydrate',
        type: ButtonEnums.type.primary,
        text: 'Yes',
        value: RESPONSE.HYDRATE_SEG,
      },
    ];
    const onSubmit = result => {
      console.log("Inside onSubmit");
      uiViewportDialogService.hide();
      resolve(result);
    };

    uiViewportDialogService.show({
      viewportId,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        console.log("Inside onOutsideClick");
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
      onKeyPress: event => {
        console.log("Inside onKeyPress");
        if (event.key === 'Enter') {
          onSubmit(RESPONSE.HYDRATE_SEG);
        }
      },
    });
  });
}

export default promptHydrateSEG;
