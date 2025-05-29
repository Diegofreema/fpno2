import { CustomBackgroundImage } from '@/components/ui/custom-background';
import { PassCode } from '@/components/ui/passcode';
import { ScrollWrapper } from '@/components/ui/wrapper';
import { StatusBar } from 'expo-status-bar';

const Passcode = () => {
  return (
    <ScrollWrapper styles={{ paddingHorizontal: 0 }}>
      <CustomBackgroundImage
        text={'Set Pin'}
        text2={'Keep this pin safe, you will use it to access your data'}
      >
        <StatusBar hidden />
        <PassCode />
      </CustomBackgroundImage>
    </ScrollWrapper>
  );
};
export default Passcode;
