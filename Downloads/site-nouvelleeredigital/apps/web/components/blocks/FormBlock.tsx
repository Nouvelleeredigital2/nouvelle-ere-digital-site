// components/blocks/FormBlock.tsx
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // Pour select et radio
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface FormBlockData {
  title?: string;
  description?: string;
  fields: FormField[];
  submitText?: string;
  submitUrl?: string;
  method?: 'POST' | 'GET';
  successMessage?: string;
  errorMessage?: string;
}

interface FormBlockProps {
  data: FormBlockData;
}

export function FormBlock({ data }: FormBlockProps) {
  const {
    title = '',
    description = '',
    fields = [],
    submitText = 'Envoyer',
    submitUrl = '',
    method = 'POST',
    successMessage = 'Merci ! Votre message a été envoyé.',
    errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.',
  } = data;

  // Générer le schéma de validation Yup dynamiquement
  const generateValidationSchema = () => {
    const schema: any = {};

    fields.forEach(field => {
      if (field.required) {
        switch (field.type) {
          case 'email':
            schema[field.id] = yup.string().email('Adresse email invalide').required('Ce champ est requis');
            break;
          case 'tel':
            schema[field.id] = yup.string().matches(/^[0-9+\-\s()]+$/, 'Numéro de téléphone invalide').required('Ce champ est requis');
            break;
          case 'number':
            schema[field.id] = yup.number().required('Ce champ est requis');
            if (field.validation?.min !== undefined) {
              schema[field.id] = schema[field.id].min(field.validation.min, `Minimum: ${field.validation.min}`);
            }
            if (field.validation?.max !== undefined) {
              schema[field.id] = schema[field.id].max(field.validation.max, `Maximum: ${field.validation.max}`);
            }
            break;
          case 'checkbox':
            schema[field.id] = yup.boolean().oneOf([true], 'Vous devez accepter les conditions');
            break;
          case 'select':
          case 'radio':
            schema[field.id] = yup.string().required('Veuillez sélectionner une option');
            break;
          default:
            schema[field.id] = yup.string().required('Ce champ est requis');
            if (field.validation?.min !== undefined) {
              schema[field.id] = schema[field.id].min(field.validation.min, `Minimum ${field.validation.min} caractères`);
            }
            if (field.validation?.max !== undefined) {
              schema[field.id] = schema[field.id].max(field.validation.max, `Maximum ${field.validation.max} caractères`);
            }
            if (field.validation?.pattern) {
              schema[field.id] = schema[field.id].matches(new RegExp(field.validation.pattern), 'Format invalide');
            }
        }
      }
    });

    return yup.object().shape(schema);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(generateValidationSchema()),
    mode: 'onBlur',
  });

  const onSubmit = async (formData: any) => {
    try {
      if (submitUrl) {
        const response = await fetch(submitUrl, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert(successMessage);
          reset();
        } else {
          throw new Error('Erreur serveur');
        }
      } else {
        // Mode développement - afficher les données dans la console
        console.log('Données du formulaire:', formData);
        alert(successMessage);
        reset();
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert(errorMessage);
    }
  };

  const renderField = (field: FormField) => {
    const error = errors[field.id];

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-muted-foreground mb-2">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </label>
            <textarea
              {...register(field.id)}
              id={field.id}
              placeholder={field.placeholder}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                error ? 'border-red-500' : 'border-border'
              }`}
              rows={4}
            />
            {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-muted-foreground mb-2">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </label>
            <select
              {...register(field.id)}
              id={field.id}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                error ? 'border-red-500' : 'border-border'
              }`}
            >
              <option value="">{field.placeholder || 'Sélectionnez une option'}</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="mb-4">
            <div className="flex items-start">
              <input
                {...register(field.id)}
                type="checkbox"
                id={field.id}
                className={`mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-border rounded ${
                  error ? 'border-red-500' : ''
                }`}
              />
              <label htmlFor={field.id} className="ml-2 text-sm text-muted-foreground">
                {field.label}
                {field.required && <span className="text-error ml-1">*</span>}
              </label>
            </div>
            {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map(option => (
                <div key={option} className="flex items-center">
                  <input
                    {...register(field.id)}
                    type="radio"
                    id={`${field.id}-${option}`}
                    value={option}
                    className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-border ${
                      error ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor={`${field.id}-${option}`} className="ml-2 text-sm text-muted-foreground">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
          </div>
        );

      default:
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-muted-foreground mb-2">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </label>
            <input
              {...register(field.id)}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                error ? 'border-red-500' : 'border-border'
              }`}
            />
            {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
          </div>
        );
    }
  };

  if (fields.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center text-muted-foreground0">
            <p>Aucun champ de formulaire configuré</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-8 rounded-lg border border-border shadow-sm">
          {fields.map(renderField)}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-card-foreground font-medium transition-colors ${
                isSubmitting
                  ? 'bg-muted cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
