import * as DeviceDimenssions from './deviceDimenssions';
import * as validatorModule from './validator';
import * as formatterModule from './formatter';
import * as dataGeneratorModule from './dataGenerator';
import * as permissionsModule from './permissions';

export const deviceWidth = DeviceDimenssions.deviceWidth;
export const deviceHeight = DeviceDimenssions.deviceHeight;
export const formatter = formatterModule;
export const validator = validatorModule;
export const dataGenerator = dataGeneratorModule;
export const permissions = permissionsModule;
