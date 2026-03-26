import { CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface WorkflowProps {
  cameraRef: React.RefObject<CameraView | null>;
  onComplete: () => void;
  onExit: () => void;
}

export const useCameraWorkflow = ({ cameraRef, onComplete, onExit }: WorkflowProps) => {
  const [step, setStep] = useState(1);
  const [idImage, setIdImage] = useState<string | undefined>(undefined);
  const [carImage, setCarImage] = useState<string | undefined>(undefined);
  const progressAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: step * 25,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
          shutterSound: false,
        });
        if (step === 1) setIdImage(photo?.uri);
        else if (step === 3) setCarImage(photo?.uri);

        setStep(prev => prev + 1);
      } catch (error) {
        console.error("Failed to take photo:", error);
      }
    }
  };

  const handleOK = () => {
    if (step === 2) setStep(3);
    else if (step === 4) onComplete();
  };

  const handleBottomLeftAction = () => {
    const isPreview = step === 2 || step === 4;
    if (!isPreview) {
      if (step === 1) setStep(3);
      else if (step === 3) onExit();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
    else onExit();
  };

  const isPreview = step === 2 || step === 4;
  const isIdStep = step === 1 || step === 2;
  const stepName = isIdStep ? 'สแกนบัตรประชาชน' : 'ถ่ายรถยนต์ผู้เยี่ยมชม';
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return {
    step,
    idImage,
    carImage,
    isPreview,
    stepName,
    progressWidth,
    handleTakePhoto,
    handleOK,
    handleBottomLeftAction,
    handleBack,
  };
};