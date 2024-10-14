import './SmartMapApp.css'

function SmartMapApp() {
    return (
        <div className="App">

            {/* 본문: 외부 URL을 iframe으로 출력 */}
            <main className="App-body">
                <iframe
                src="https://map.seoul.go.kr/smgis2/short/6P130"
                title="Seoul Map"
                width="70%"
                height="70%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                ></iframe>
            </main>
        </div>
    );
}

export default SmartMapApp;