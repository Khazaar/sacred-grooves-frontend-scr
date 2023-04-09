import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
} from "@mui/material";
//process.env.LOCALHOST_URL +

async function getMe() {
    try {
        const res = await fetch("/api/user/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const user: IUserDto = {
            nickName: "test",
            firstName: "test",
            lastName: "test",
            email: "dd@rddr.rdddd",
        };

        // fetch("/api/user/create/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(user),
        // });

        //const data = res.json();
        console.log("res");
        console.log(await res.json());
        //return data as IUserDto;
    } catch (error) {
        console.log(error);
    }
}
export default function ShowProfile() {
    return (
        <>
            <Button
                onClick={() => {
                    getMe();
                }}
            >
                getMe
            </Button>
        </>
        // { userData } && (
        //     <TableContainer component={Paper}>
        //         <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //             <TableBody>
        //                 <TableRow
        //                     key="Nick Name"
        //                     sx={{
        //                         "&:last-child td, &:last-child th": {
        //                             border: 0,
        //                         },
        //                     }}
        //                 >
        //                     <TableCell component="th" scope="row">
        //                         Nick Name
        //                     </TableCell>
        //                     <TableCell component="th" scope="row">
        //                         {/* {userData && userData.nickName} */}
        //                     </TableCell>
        //                 </TableRow>
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        // )
    );
}
