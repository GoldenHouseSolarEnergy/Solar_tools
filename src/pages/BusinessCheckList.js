import React, { useState } from "react";
import { Container, Card, Box, Grid, Paper, CssBaseline, Button, Typography, TextField } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
const checkList = [
    "名片",
    "DM",
    "一代葵花寶典(藍色)",
    "二代葵花寶典(紅色)",
    "一代鋁脊(無導水)",
    "二代鋁脊(有導水槽)",
    "空拍機及電池",
    "測距儀",
    "指南針",
    "捲尺",
];
const BusinessCheckList = () => {
    const [checked, setChecked] = useState({ ...checkList.map(() => false) });
    return (
        <Container>
            <br />
            <Typography variant="h6" color="textSecondary" align="left">
                業務拜訪前檢查
            </Typography>
            <br />
            <Grid container spacing={3} maxwidth="xs">
                {checkList.map((item, index) => {
                    return (
                        <Grid item md={6} xs={12} key={index}>
                            <Card>
                                <Grid container spacing={3} alignContent="center">
                                    <Button
                                        style={{ backgroundColor: checked[index] ? "#b9f6ca" : "#ff8a80" }}
                                        onClick={() => {
                                            setChecked((prev) => {
                                                return { ...prev, [index]: !prev[index] };
                                            });
                                        }}
                                        fullWidth
                                    >
                                        <Grid item md={2} xs={3}>
                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                {checked[index] ? (
                                                    <CheckBoxOutlinedIcon />
                                                ) : (
                                                    <CheckBoxOutlineBlankIcon />
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item md={10} xs={9}>
                                            <h3>{item}</h3>
                                        </Grid>
                                    </Button>
                                </Grid>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default BusinessCheckList;
