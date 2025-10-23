
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useApp } from '@/contexts/AppContext';
import { IconSymbol } from '@/components/IconSymbol';
import TrickCard from '@/components/TrickCard';
import { Trick, TrickCategory, DifficultyLevel } from '@/types/tricks';
import { Picker } from '@react-native-picker/picker';

type SortOption = 'a-z' | 'z-a' | 'shortest' | 'longest';

export default function TricksScreen() {
  const theme = useTheme();
  const { tricks } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TrickCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('a-z');
  const [showFilters, setShowFilters] = useState(false);

  const categories: (TrickCategory | 'All')[] = ['All', 'Card Tricks', 'Coin Tricks', 'Mind Reading', 'Close Up Magic', 'Illusions'];
  const difficulties: (DifficultyLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'shortest', label: 'Shortest First' },
    { value: 'longest', label: 'Longest First' }
  ];

  const filteredAndSortedTricks = useMemo(() => {
    let filtered = tricks.filter(trick => {
      const matchesSearch = trick.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || trick.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || trick.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        case 'shortest':
          return a.estimatedTime - b.estimatedTime;
        case 'longest':
          return b.estimatedTime - a.estimatedTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [tricks, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Vault of Tricks</Text>
        <Text style={[styles.headerSubtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
          {filteredAndSortedTricks.length} tricks available
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.dark ? '#1C1C1E' : '#F2F2F7' }]}>
          <IconSymbol name="magnifyingglass" size={20} color={theme.dark ? '#98989D' : '#8E8E93'} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search tricks..."
            placeholderTextColor={theme.dark ? '#98989D' : '#8E8E93'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: theme.dark ? '#1C1C1E' : '#F2F2F7' }]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <IconSymbol name="slider.horizontal.3" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={[styles.filtersContainer, { backgroundColor: theme.dark ? '#1C1C1E' : '#F2F2F7' }]}>
          <Text style={[styles.filterLabel, { color: theme.colors.text }]}>Category</Text>
          <View style={[styles.pickerContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#FFF' }]}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue as TrickCategory | 'All')}
              style={[styles.picker, { color: theme.colors.text }]}
              dropdownIconColor={theme.colors.text}
            >
              {categories.map(cat => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.filterLabel, { color: theme.colors.text }]}>Difficulty</Text>
          <View style={[styles.pickerContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#FFF' }]}>
            <Picker
              selectedValue={selectedDifficulty}
              onValueChange={(itemValue) => setSelectedDifficulty(itemValue as DifficultyLevel | 'All')}
              style={[styles.picker, { color: theme.colors.text }]}
              dropdownIconColor={theme.colors.text}
            >
              {difficulties.map(diff => (
                <Picker.Item key={diff} label={diff} value={diff} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.filterLabel, { color: theme.colors.text }]}>Sort By</Text>
          <View style={[styles.pickerContainer, { backgroundColor: theme.dark ? '#2C2C2E' : '#FFF' }]}>
            <Picker
              selectedValue={sortBy}
              onValueChange={(itemValue) => setSortBy(itemValue as SortOption)}
              style={[styles.picker, { color: theme.colors.text }]}
              dropdownIconColor={theme.colors.text}
            >
              {sortOptions.map(option => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.tricksContainer,
          Platform.OS !== 'ios' && styles.tricksContainerWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredAndSortedTricks.map(trick => (
          <TrickCard key={trick.id} trick={trick} />
        ))}
        {filteredAndSortedTricks.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="sparkles" size={48} color={theme.dark ? '#98989D' : '#8E8E93'} />
            <Text style={[styles.emptyText, { color: theme.dark ? '#98989D' : '#8E8E93' }]}>
              No tricks found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  pickerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  picker: {
    height: 50,
  },
  scrollView: {
    flex: 1,
  },
  tricksContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tricksContainerWithTabBar: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
