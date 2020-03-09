import * as React from 'react';

import './styles.css';

function DevForm(props) {

    const { onSubmit } = props;

    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLogintude] = React.useState('');
    const [github_username, setGitHubUserName] = React.useState('');
    const [techs, setTechs] = React.useState('');
    
    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude.toString());
                setLogintude(longitude.toString());
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function handleAddDev(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });        

        setGitHubUserName('');
        setTechs('');
    }

    return (
        <form onSubmit={handleAddDev}>
            <div className="input-block">
                <label htmlFor="github_username">GitHub UserName</label>
                <input name="github_username" id="github_username" required
                    value={github_username}
                    onChange={e => setGitHubUserName(e.target.value)} />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Technologies</label>
                <input name="techs" id="techs" required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" name="latitude" id="latitude" required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" name="longitude" id="longitude" required
                        value={longitude}
                        onChange={e => setLogintude(e.target.value)} />
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    );
}

export default DevForm;