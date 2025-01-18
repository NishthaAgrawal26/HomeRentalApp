'use client'

import React from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading'
// import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { useForm, FieldValues } from 'react-hook-form'
 

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = React.useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category : '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc : '',
            price : 1,
            title : '',
            description : '',
        }
    });

    const category = watch('category');
    const setCustomeValue = (id: string, value: any) => {
        setValue(id, value , {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
            
        })
    }


    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onNext = () => {
        setStep((value) => value + 1);
    };
    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create'
        }
        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div  className =" flex flex-col gap-8">
          <Heading
            title="What type of property do you have?"
            subtitle="Select the category that best fits your property"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
                <div key={item.label} className="col-span-1">
                    <CategoryInput
                       onClick={(category) => {setCustomeValue('category', category)}}
                        selected={category === item.label}
                        label={item.label}
                        icon ={item.icon}
                    />
                </div>
            ))}

          </div>
        </div>
    )


    

    return (
    <Modal
    isOpen={rentModal.isOpen} 
    onClose={rentModal.onClose}
    onSubmit={rentModal.onClose}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title="Rent your home !"
    body = {bodyContent}
    />
  );
}

export default RentModal