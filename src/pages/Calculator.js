import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Box, Button, Typography, TextField } from "@material-ui/core";
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}
const Calculator = () => {
    const [squareMeter, setSquareMeter] = useState("");
    const [landSize, setLandSize] = useState("");
    const [kw, setKw] = useState("");
    const [disSquareMeter, setDisSquareMeter] = useState("");
    const [disLandSize, setDisLandSize] = useState("");
    const [disKw, setDisKw] = useState("");

    const handleSquareMeterChange = (event) => {
        setSquareMeter(event.target.value);
    };
    const handleLandSizeChange = (event) => {
        setLandSize(event.target.value);
    };
    const handleKwChange = (event) => {
        setKw(event.target.value);
    };

    const handleClear = () => {
        setDisSquareMeter("");
        setDisLandSize("");
        setDisKw("");
    };

    const getValue = (str) => {
        if (str === "") return "";
        else if (str[str.length - 1] === ".") return str;
        else return parseFloat(str);
    };
    useEffect(() => {
        const value = getValue(squareMeter);
        setDisSquareMeter(value);
        setDisLandSize(squareMeter === "" ? "" : roundToTwo(squareMeter * 0.305));
        setDisKw(squareMeter === "" ? "" : roundToTwo((squareMeter * 0.305) / 1.7));
    }, [squareMeter]);
    useEffect(() => {
        const value = getValue(landSize);
        setDisSquareMeter(value === "" ? "" : roundToTwo(value / 0.305));
        setDisLandSize(value);
        setDisKw(value === "" ? "" : roundToTwo(value / 1.7));
    }, [landSize]);
    useEffect(() => {
        const value = getValue(kw);
        setDisSquareMeter(value === "" ? "" : roundToTwo((kw * 1.7) / 0.305));
        setDisLandSize(value === "" ? "" : roundToTwo(kw * 1.7));
        setDisKw(value);
    }, [kw]);
    return (
        <Container>
            <br />
            <Typography variant="h6" color="textSecondary" align="left">
                坪數計算機
            </Typography>
            <br />
            <Paper>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="平方公尺"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleSquareMeterChange}
                                    fullWidth
                                    value={disSquareMeter}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="坪數"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleLandSizeChange}
                                    fullWidth
                                    value={disLandSize}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <TextField
                                    label="KW數"
                                    InputLabelProps={{ shrink: true }}
                                    variant="filled"
                                    onChange={handleKwChange}
                                    fullWidth
                                    value={disKw}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <br />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container justifyContent="center">
                            <Box width="80%">
                                <Button color="primary" variant="contained" fullWidth onClick={handleClear}>
                                    清除
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Calculator;
