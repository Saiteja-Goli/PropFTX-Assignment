
import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
} from "@chakra-ui/react";

const MovieForm = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    const [localFormData, setLocalFormData] = useState({
        title: "",
        year: "",
        image: "",
    });

    const [formErrors, setFormErrors] = useState({
        title: false,
        year: false,
        image: false,
    });

    useEffect(() => {
        if (formData) {
            setLocalFormData(formData);
        } else {
            setLocalFormData({
                title: "",
                year: "",
                image: "",
            });
        }
    }, [formData]);

    const handleChange = (e) => {
        setLocalFormData({
            ...localFormData,
            [e.target.name]: e.target.value,
        });

        // Clear error when user starts typing
        setFormErrors({
            ...formErrors,
            [e.target.name]: false,
        });
    };

    const handleSubmit = () => {
        // Check for empty fields
        const errors = {};
        Object.keys(localFormData).forEach((key) => {
            if (!localFormData[key]) {
                errors[key] = true;
            }
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Submit the form and reset localFormData
            onSubmit(localFormData);
            onClose();
            setLocalFormData({
                title: "",
                year: "",
                image: "",
            });
            // Clear any previous errors
            setFormErrors({
                title: false,
                year: false,
                image: false,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{formData ? "Edit Movie" : "Add Movie"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired isInvalid={formErrors.title}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            value={localFormData.title}
                            onChange={handleChange}
                        />
                        {formErrors.title && (
                            <Text color="red.500" fontSize="sm">
                                Title is required
                            </Text>
                        )}
                    </FormControl>
                    <FormControl mt={4} isRequired isInvalid={formErrors.year}>
                        <FormLabel>Year</FormLabel>
                        <Input
                            type="text"
                            name="year"
                            value={localFormData.year}
                            onChange={handleChange}
                        />
                        {formErrors.year && (
                            <Text color="red.500" fontSize="sm">
                                Year is required
                            </Text>
                        )}
                    </FormControl>
                    <FormControl mt={4} isRequired isInvalid={formErrors.image}>
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            type="text"
                            name="image"
                            value={localFormData.image}
                            onChange={handleChange}
                        />
                        {formErrors.image && (
                            <Text color="red.500" fontSize="sm">
                                Image URL is required
                            </Text>
                        )}
                    </FormControl>
                    <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
                        {formData ? "Edit Movie" : "Add Movie"}
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MovieForm;
