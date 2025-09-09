import { useState, useCallback } from 'react';
import { BookingFormData, FormErrors } from '../types';

const initialFormData: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  aircraft: '',
  preferredDate: '',
  preferredTime: '',
  experience: ''
};

export const useBookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const formatPhoneNumber = (value: string, previousValue = ''): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    const prevDigits = previousValue.replace(/\D/g, '');
    
    // If user is deleting (fewer digits than before), be more permissive with formatting
    const isDeleting = digits.length < prevDigits.length;
    
    // Limit to 10 digits
    const limitedDigits = digits.slice(0, 10);
    
    // Return empty string if no digits (allows complete clearing)
    if (limitedDigits.length === 0) {
      return '';
    }
    
    // If deleting, be more permissive with formatting to allow easier deletion
    if (isDeleting) {
      if (limitedDigits.length <= 3) {
        // When deleting down to 3 or fewer digits, don't add parentheses
        return limitedDigits;
      } else if (limitedDigits.length <= 6) {
        // When deleting down to 6 or fewer digits, don't add the dash
        return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
      }
    }
    
    // Format as (###) ###-####
    if (limitedDigits.length >= 6) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
    } else if (limitedDigits.length >= 3) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    } else {
      return limitedDigits; // Return just the digits for 1-2 digits
    }
  };

  const validateDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    } else if (!validateDate(formData.preferredDate)) {
      newErrors.preferredDate = 'Please select a future date';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience level is required';
    }

    return newErrors;
  }, [formData]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Apply phone formatting only to phone field
    let processedValue = value;
    if (name === 'phone') {
      // Allow completely empty value for deletion
      if (value === '') {
        processedValue = '';
      } else {
        processedValue = formatPhoneNumber(value, formData.phone);
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors, formData.phone]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const submitForm = useCallback(async (onSubmit: (data: BookingFormData) => Promise<void>) => {
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return false;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      resetForm();
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, resetForm]);

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    resetForm,
    submitForm,
    setFormData
  };
};