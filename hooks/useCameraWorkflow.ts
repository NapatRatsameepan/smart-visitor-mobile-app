import { CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { apiService } from '@/services/api';

interface WorkflowProps {
  cameraRef: React.RefObject<CameraView | null>;
  onComplete: (data: any) => void;
  onExit: () => void;
}

export const useCameraWorkflow = ({ cameraRef, onComplete, onExit }: WorkflowProps) => {
  const [step, setStep] = useState(1);
  const [idImage, setIdImage] = useState<string | undefined>(undefined);
  const [carImage, setCarImage] = useState<string | undefined>(undefined);
  const [idBase64, setIdBase64] = useState<string | undefined>(undefined);
  const [carBase64, setCarBase64] = useState<string | undefined>(undefined);
  
  const [isLoading, setIsLoading] = useState(false);
  const progressAnim = useRef(new Animated.Value(25)).current;
  const router = useRouter();

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
          quality: 0.5,
          base64: true,
          shutterSound: false,
        });
        
        if (step === 1) {
          setIdImage(photo?.uri);
          setIdBase64(photo?.base64);
          setStep(2);
        } else if (step === 3) {
          setCarImage(photo?.uri);
          setCarBase64(photo?.base64);
          setStep(4);
        }
      } catch (error) {
        console.error("Failed to take photo:", error);
      }
    }
  };

  const processCombinedOcr = async () => {
    if (!idBase64 || !carBase64) {
      onComplete({ idImage, carImage });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.ocr.analyzeCombined(idBase64, carBase64);
      onComplete({
        visitor: response.visitor,
        vehicle: response.vehicle,
        idCloudinaryUrl: response.idCloudinaryUrl,
        carCloudinaryUrl: response.carCloudinaryUrl,
        idImage,
        carImage,
      });
    } catch (error) {
      console.error("Combined OCR Error:", error);
      onComplete({ idImage, carImage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOK = async () => {
    if (step === 2) {
      setStep(3);
    } else if (step === 4) {
      await processCombinedOcr();
    }
  };

  const handleBottomLeftAction = () => {
    const isPreview = step === 2 || step === 4;
    if (!isPreview) {
      if (step === 1) setStep(3);
      else if (step === 3) onComplete({ idImage, carImage });
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
    isLoading,
    stepName,
    progressWidth,
    handleTakePhoto,
    handleOK,
    handleBottomLeftAction,
    handleBack,
  };
};
