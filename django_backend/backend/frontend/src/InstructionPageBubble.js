export default function InstructionPageBubble(){


    const welcomeMessage="Welcome Admin! You have successfully logged in";
    const abilityMessage="Here, you have the ability to:";
    const scanningMessage="Click to enter scanning mode and detect new items for inventory";
    const signoutMessage="Browse and edit the inventory";
    const editSearchMessage="Log out of the system securely to end your session";

    return(
        <div className="container justify-content-center noCursor bubble text-center">
            <div className="row justify-content-center" >
                <div className="col-sm-12 justify-content-center text-center py-3">
                    <p className="display-5 largeTextStyle text-center"><strong>{welcomeMessage}</strong></p>
                    <p className="smallTextStyle text-center">{abilityMessage}</p>
                    <p className="mediumTextStyle text-start">{scanningMessage}</p>
                    <p className="mediumTextStyle text-start">{signoutMessage}</p>
                    <p className="mediumTextStyle text-start">{editSearchMessage}</p>
                </div>
            </div>
        </div>
    );
}