// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     ModalCloseButton,
//     FormControl,
//     FormLabel,
//     Input,
//     Button
// } from "@chakra-ui/react"
// const MovieForm = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = () => {
//         onSubmit(formData);
//         onClose();
//     };

//     return (
//         <Modal isOpen={isOpen} onClose={onClose}>
//             <ModalOverlay />
//             <ModalContent>
//                 <ModalHeader>{formData ? "Edit Movie" : "Add Movie"}</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody>
//                     <FormControl>
//                         <FormLabel>Title</FormLabel>
//                         <Input
//                             type="text"
//                             name="title"
//                             value={formData?.title || ""}
//                             onChange={handleChange}
//                         />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>Year</FormLabel>
//                         <Input
//                             type="text"
//                             name="year"
//                             value={formData?.year || ""}
//                             onChange={handleChange}
//                         />
//                     </FormControl>
//                     <FormControl mt={4}>
//                         <FormLabel>Image URL</FormLabel>
//                         <Input
//                             type="text"
//                             name="image"
//                             value={formData?.image || ""}
//                             onChange={handleChange}
//                         />
//                     </FormControl>
//                     <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
//                         {formData ? "Edit Movie" : "Add Movie"}
//                     </Button>
//                 </ModalBody>
//             </ModalContent>
//         </Modal>
//     );
// };
// export default MovieForm
// MovieForm.jsx
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
    Button
} from "@chakra-ui/react";

const MovieForm = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    const [localFormData, setLocalFormData] = useState({
        title: "",
        year: "",
        image: "",
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
    };

    const handleSubmit = () => {
        onSubmit(localFormData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{formData ? "Edit Movie" : "Add Movie"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            value={localFormData.title}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Year</FormLabel>
                        <Input
                            type="text"
                            name="year"
                            value={localFormData.year}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            type="text"
                            name="image"
                            value={localFormData.image}
                            onChange={handleChange}
                        />
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
