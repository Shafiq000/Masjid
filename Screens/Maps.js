import { StyleSheet, Text, View, Pressable, PermissionsAndroid, SafeAreaView, Alert, Image, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Searchbar } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import mosques from '../Jsondata/Mosques.json';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MosqueIcons from "react-native-vector-icons/MaterialIcons";
import LocIcon from 'react-native-vector-icons/EvilIcons';
import haversine from 'haversine';

const Maps = ({ title, navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const mapViewRef = useRef(null);
    const [filteredMosques, setFilteredMosques] = useState(mosques.data);

    useEffect(() => {
        requestCameraPermission();
        getCurrentLocation();
    }, []);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Cool Photo App Camera Permission",
                    message: "Cool Photo App needs access to your camera so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                if (mapViewRef.current) {
                    mapViewRef.current.animateToRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    });
                }
                updateMosquesWithDistances(latitude, longitude);
            },
            
            (error) => console.log(error),
            {
                TIMEOUT: 3,
                POSITION_UNAVAILABLE: 2,
                PERMISSION_DENIED: 1,
                message: "Location request timed out",
                ACTIVITY_NULL: 4,
                code: 3,
            }
        );
    };

    const parseCoordinates = (location) => {
        return {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
        };
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const start = { latitude: parseFloat(lat1), longitude: parseFloat(lon1) };
        const end = { latitude: parseFloat(lat2), longitude: parseFloat(lon2) };
        const distance = haversine(start, end, { unit: 'meter' });
        return distance;
    };

    const updateMosquesWithDistances = (latitude, longitude) => {
        const updatedMosques = mosques.data.map((mosque) => {
            const distance = calculateDistance(
                latitude,
                longitude,
                mosque.mosque.location.latitude,
                mosque.mosque.location.longitude
            );
            mosque.distanceText = distance >= 1000 ? (distance / 1000).toFixed(1) + ' Km' : distance.toFixed(0) + ' M';
            return mosque;
        });
        setFilteredMosques(updatedMosques);
    };

    const filterMosques = (query) => {
        let filtered = mosques.data;
        if (query) {
            filtered = filtered.filter((mosque) =>
                mosque.mosque.title && mosque.mosque.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        setFilteredMosques(filtered);
        setSearchQuery(query);
    };

    const handleItemPress = (item) => {
        navigation.navigate('MasjidDetails', { itemId: item.id });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <Pressable hitSlop={20} onPress={() => navigation.goBack()} style={styles.icon}>
                    <Icon name='left' size={25} color={'#fff'} />
                </Pressable>
                <View style={styles.searchContainer}>
                    <Searchbar
                        style={styles.searchBar}
                        inputStyle={{ minHeight: 0 }}
                        clearIcon={false}
                        searchIcon={false}
                        selectionColor={'#0a9484'}
                        placeholder="Search"
                        onChangeText={filterMosques}
                        value={searchQuery}
                    />
                </View>
            </View>
            <View style={styles.mosqueListContainer}>
                <FlatList
                    data={filteredMosques}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleItemPress(item)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10,paddingHorizontal:10 }}>
                                <LocIcon name='location' size={30} color={'#000'} />
                                
                                    <Text style={styles.mosqueTitle}>{item.mosque.title}</Text>
                                    <Text style={styles.distanceText}>{item.distanceText}</Text>
                                   
                               
                            </View>
                        </Pressable>
                    )}
                />
            </View>

            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={
                    currentLocation
                        ? {
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }
                        : null
                }
            >
                {currentLocation && (
                    <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        title="You are here"
                        pinColor="blue"
                    />
                )}
                {mosques.data.map((item, index) => {
                    const coordinates = parseCoordinates(item.mosque.location);
                    return (
                        <Marker
                            key={index}
                            coordinate={coordinates}
                            title={item.mosque.title}
                            description={item.mosque.location.address}>
                            <View style={styles.customMarkerMosque}>
                                <Image
                                    source={require('../src/Images/pin.png')}
                                    style={{ height: 50, width: 50 }}
                                />
                                <MosqueIcons name='mosque' size={20} color={'#fff'} right={35} bottom={5} />
                            </View>
                        </Marker>
                    );
                })}
            </MapView>
            <Pressable style={styles.myLocationButton} onPress={getCurrentLocation}>
                <MaterialIcons name="my-location" size={30} color="#0a9484" />
            </Pressable>
        </SafeAreaView>
    );
};

export default Maps;

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#0a9484',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        left: 8,
    },
    searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        width: '85%',
    },
    searchBar: {
        height: 35,
        width: '88%',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: '#F6F4F5',
    },
    map: {
        flex: 1,
    },
    myLocationButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
    },
    customMarker: {
        backgroundColor: '#0a9484',
        padding: 5,
        borderTopColor: 'red',
        borderStartStartRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
    },
    customMarkerMosque: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mosqueListContainer: {
        flex: .4,
        paddingHorizontal: 10,
    },
    mosqueTitle: {
        color: "#000",
        fontSize: 16,
        paddingHorizontal: 10,
        flex: 1,
        flexWrap: 'wrap'
    },
    distanceText: {
        color: "#000",
        fontSize: 14,
    }
});
