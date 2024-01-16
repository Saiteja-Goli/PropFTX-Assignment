import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Center,
    Heading,
    Image,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";

import MovieForm from "./MovieForm";
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const toast = useToast()

    //Fetching Movies
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://propftxmovies-mv6jh5jhe-saiteja-goli.vercel.app/movies/");
                console.log(response.data.movies);
                setMovies(response.data.movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);
    //Adding New Movie
    const handleAddMovie = async (newMovie) => {
        try {
            const response = await axios.post("https://propftxmovies-mv6jh5jhe-saiteja-goli.vercel.app/movies/addmovie", newMovie);
            setMovies([...movies, response.data.movie]);
            toast({
                title: 'Movie Added.',
                description: "Movie Added Successfuly.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };
    //Editing Movie
    const handleEditMovie = async (editedMovie) => {
        try {
            const response = await axios.put(`https://propftxmovies-mv6jh5jhe-saiteja-goli.vercel.app/movies/edit/${editedMovie._id}`, editedMovie);
            const updatedMovies = movies.map(movie =>
                movie._id === response.data.movie._id ? response.data.movie : movie
            );
            setMovies(updatedMovies);
            toast({
                title: 'Movie Edited.',
                description: "Movie Edited Successfuly.",
                status: 'info',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            console.error("Error editing movie:", error);
        }
    };
    //Deleting Movie
    const handleDeleteMovie = async (movieId) => {
        try {
            await axios.delete(`https://propftxmovies-mv6jh5jhe-saiteja-goli.vercel.app/movies/delete/${movieId}`);
            const updatedMovies = movies.filter(movie => movie._id !== movieId);
            setMovies(updatedMovies);
            toast({
                title: 'Movie Deleted.',
                description: "Movie Deleted Successfuly.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    return (
        <div>
            <Box backgroundColor="purple.200"
                mb={5}
                p={5}
                position="fixed"
                width="100%"
                top="0"
                zIndex="1000"
            ><Heading>Movies</Heading></Box>
            <Button variant="solid" colorScheme="green" mt={100} ml={960} onClick={() => setIsAddFormOpen(true)}>
                Add Movie
            </Button>

            <MovieForm
                isOpen={isAddFormOpen}
                onClose={() => setIsAddFormOpen(false)}
                onSubmit={handleAddMovie}
                formData={null}
                setFormData={() => { }}
            />

            <Center>
                <Box
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "10px",
                    }}
                >
                    {movies.map((movie) => (
                        <Box key={movie._id} mt={10} gap={10} maxW="sm">
                            <Card>
                                <Image
                                    src={movie.image}
                                    alt={movie.title}
                                    borderTopRadius="lg"
                                    maxH="200px"
                                    objectFit="cover"
                                />
                                <CardBody>
                                    <Stack spacing="3">
                                        <Heading size="md">{movie.title}</Heading>
                                        <Text color="blue.600" fontSize="lg">
                                            YEAR : {movie.year}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Center>
                                    <ButtonGroup mb={10} spacing="2">
                                        <Button
                                            variant="solid"
                                            colorScheme="blue"
                                            onClick={() => {
                                                setIsEditFormOpen(true);
                                                setEditFormData(movie);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="solid"
                                            colorScheme="red"
                                            onClick={() => handleDeleteMovie(movie._id)}
                                        >
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </Center>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Center>

            <MovieForm
                isOpen={isEditFormOpen}
                onClose={() => {
                    setIsEditFormOpen(false);
                    setEditFormData(null);
                }}
                onSubmit={handleEditMovie}
                formData={editFormData}
                setFormData={setEditFormData}
            />
        </div>
    );
};

export default MovieList;
